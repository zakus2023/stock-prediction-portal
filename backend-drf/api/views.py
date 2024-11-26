from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework import status
from rest_framework.response import Response

import yfinance as yf
import pandas as pd
import numpy as np
# import matplotlib as plt
from datetime import datetime

import matplotlib.pyplot as plt
# import os
# from django.conf import settings

from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error, r2_score


# Create your views here.


class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']

            # fetch data from yfinance
            now = datetime.now()

            start = datetime(now.year-10, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)
            

            # check if the stock ticker entered by the user is correct. NB: if the user enters the wrong ticker it will return an empty datset
            if df.empty:
                return Response({"error":"No data found for the giving Ticker, Check the ticker and try again",'status': status.HTTP_404_NOT_FOUND})
            
            # reset the index of the data coming from yfinance
            df = df.reset_index()
            
            # Generate basic plot
            # switch the backend
            plt.switch_backend('AGG') # the AGG backend is designed to save the plot as image file

            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, label='Closing Price ($)')
            plt.title(f'Closing price of {ticker}')
            plt.xlabel("Days")
            plt.ylabel("Closing Price ($)")
            plt.legend()

            # save the generated plot to the media folder
            image_name = f'{ticker}_plot.png'
            plot_img_url = save_plot(image_name)
            

            # 100 days moving average
            MA_100 = df.Close.rolling(100).mean()
            plt.switch_backend('AGG') # the AGG backend is designed to save the plot as image file
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, label='100 days mooving Closing Price')
            plt.plot(MA_100, 'r', label='100 Days Moving Average')
            plt.title(f'100 days moving closing price of {ticker}')
            plt.xlabel("Days")
            plt.ylabel("Closing Price ($)")
            plt.legend()

            # Save the generated graph to the media folder
            image_name = f'{ticker}_100_days.png'
            plot_100_days = save_plot(image_name)


            # 200 days moving average
            MA_200 = df.Close.rolling(200).mean()
            plt.switch_backend('AGG') # the AGG backend is designed to save the plot as image file
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, label='200 days moving Closing Price ($)')
            plt.plot(MA_200, 'g', label='200 Days Moving Average')
            plt.title(f' 200 days moving closing price of {ticker}')
            plt.xlabel("Days")
            plt.ylabel("Closing Price ($)")
            plt.legend()

            # MAKING THE PREDICTION

            # Save the generated graph to the media folder
            image_name = f'{ticker}_200_days.png'
            plot_200_days = save_plot(image_name)

            # Split data into 70% training and 30% testing
            training_data = pd.DataFrame(df.Close[0:int(len(df)*0.7)])  # 0 to 70% for training
            testing_data = pd.DataFrame(df.Close[int(len(df)*0.7):int(len(df))]) 

            # initialize the scaler to scale down the data between 0 and 1
            scaler = MinMaxScaler(feature_range=(0,1))

            # load ML model

            model = load_model('stock_prediction_model.keras')

            # prepare test data

            past_hundred_days_data = training_data.tail(100)
            final_df = pd.concat([past_hundred_days_data, testing_data], ignore_index=True)
            input_data = scaler.fit_transform(final_df)

            x_test = []
            y_test = []

            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100: i])
                y_test.append(input_data[i,0])

            x_test, y_test = np.array(x_test), np.array(y_test)

            # make the prediction
            y_predicted = model.predict(x_test)

            # revert the scaled prices to original prices
            y_predicted = scaler.inverse_transform(y_predicted.reshape(-1, 1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()

            # Plot the graph for the final predictions
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,6))
            plt.plot(y_test, 'b', label="Original Price ($)")
            plt.plot(y_predicted, 'r', label="Predicted Price")
            plt.title(f"Final Prediction for {ticker}")
            plt.xlabel('days')
            plt.ylabel('Price ($)')
            plt.legend()

            # save the final prediction plot
            image_name = f'{ticker}_final_prediction.png'
            final_prediction = save_plot(image_name)


            # MODEL EVALUATION
            mse = mean_squared_error(y_test, y_predicted)
            rmse = np.sqrt(mse)
            r2 = r2_score(y_test, y_predicted)

            return Response({'status': 'success', 'plot_img_url':plot_img_url, 'plot_100_days': plot_100_days, 'plot_200_days':plot_200_days, 'final_prediction':final_prediction, 'mse':mse, 'rmse':rmse, 'r2':r2})
            

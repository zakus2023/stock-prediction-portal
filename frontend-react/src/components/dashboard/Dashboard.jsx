import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosinstance";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [ticker, setTicker] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [plots, setPlots] = useState("");
  const [ma100, setMa100] = useState("");
  const [ma200, setMa200] = useState("");
  const [finalPrediction, setFinalPrediction] = useState("");
  const [mse, setMse] = useState("");
  const [rmse, setRMse] = useState("");
  const [r2, setR2] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get("/protected-view");
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchProtectedData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/predict/", {
        ticker: ticker,
      });

      const backendroot = import.meta.env.VITE_BACKEND_ROOT;
      const plotURL = `${backendroot}${response.data.plot_img_url}`;
      const ma100Url = `${backendroot}${response.data.plot_100_days}`;
      const ma200Url = `${backendroot}${response.data.plot_200_days}`;
      const finalprediction = `${backendroot}${response.data.final_prediction}`;

      setPlots(plotURL);
      setMa100(ma100Url);
      setMa200(ma200Url);
      setFinalPrediction(finalprediction);
      setMse(response.data.mse);
      setRMse(response.data.rmse);
      setR2(response.data.r2);

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setError("");
      }
    } catch (error) {
      console.error("there was an error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter stock ticker"
                onChange={(e) => setTicker(e.target.value)}
                required
              />
              <small>
                {error && <div className="text-danger">{error}</div>}
              </small>
              <button type="submit" className="btn btn-info mt-3">
                {loading ? (
                  <span>
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Please wait...
                  </span>
                ) : (
                  "See Prediction"
                )}
              </button>
            </form>
          </div>
          <div className="prediction mt-5">
            <div className="p-3">
              {plots && (
                <img src={plots} style={{ maxWidth: "100%" }} alt="Plots" />
              )}
            </div>
            <div className="p-3">
              {ma100 && (
                <img src={ma100} style={{ maxWidth: "100%" }} alt="Plots" />
              )}
            </div>
            <div className="p-3">
              {ma200 && (
                <img src={ma200} style={{ maxWidth: "100%" }} alt="Plots" />
              )}
            </div>
            <div className="p-3">
              {finalPrediction && (
                <img
                  src={finalPrediction}
                  style={{ maxWidth: "100%" }}
                  alt="Plots"
                />
              )}
            </div>
            <div className="text-light p-4">
              {mse && rmse && r2 && (
                <div className="col-md-4 mx-auto">
                  <h4>Model Evaluation</h4>
                  <div className="mt-3">
                    <div className="d-flex justify-content-between">
                      <span>Mean Squared Error (MSE):</span>
                      <span>{mse}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Root Mean Squared Error (RMSE):</span>
                      <span>${rmse}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Root Squared (R-Squared):</span>
                      <span>{r2}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

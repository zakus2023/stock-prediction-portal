from django.shortcuts import render
from .serializer import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
# for protected view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Create your views here.


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# for testing protected view

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        response = {'status':'OK'}
        return Response(response)

from django.urls import path
from accounts import views as UserViews
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('register/', UserViews.RegisterView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # eg of protected view for testing
    path('protected-view', UserViews.ProtectedView.as_view()) # go to account/views.py and create a a test view for this url
]
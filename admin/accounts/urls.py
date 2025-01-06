from django.urls import path
from accounts.views import VerifyOTPView, SendOTPView, CustomTokenObtainPairView, CustomTokenRefreshView, ResetView

urlpatterns = [
    path('verify/', SendOTPView.as_view(), name='user_verify'),
    path('register/', VerifyOTPView.as_view(), name='user_register'),
    path('reset/', ResetView.as_view(), name='password_reset'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
]

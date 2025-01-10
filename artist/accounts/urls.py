from django.urls import path
from accounts.views import SendOTPView, VerifyOTPView, ResetView, UpdateArtistView, CustomTokenObtainPairView, CustomTokenRefreshView

urlpatterns = [
    path('verify/', SendOTPView.as_view(), name='artist_verify'),
    path('register/', VerifyOTPView.as_view(), name='artist_register'),
    path('reset/', ResetView.as_view(), name='artist_password_reset'),
    path('update/', UpdateArtistView.as_view(), name='artist_update'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
]

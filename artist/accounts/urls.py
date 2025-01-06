from django.urls import path
from artists.views import SendOTPView, VerifyOTPView, ResetView, ArtistLoginView

urlpatterns = [
    path('verify/', SendOTPView.as_view(), name='artist_verify'),
    path('register/', VerifyOTPView.as_view(), name='artist_register'),
    path('reset/', ResetView.as_view(), name='artist_password_reset'),
    path('token/', ArtistLoginView.as_view(), name='artist_login'),
]

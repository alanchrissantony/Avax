from django.urls import path
from artists import views

urlpatterns = [
    path('', views.Artists.as_view(), name='fetch_artists'),
    path('verify/', views.Artists.as_view(), name='verify_artist'),
]

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/admin/auth/', include('accounts.urls')),
    path('api/admin/artists/', include('artists.urls')),
]

from django.apps import AppConfig
import threading


class ArtistsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'artists'

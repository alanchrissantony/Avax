from django.apps import AppConfig
import threading


class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'accounts'

    # def ready(self):
    #     from accounts.consumers import artists_request
    #     threading.Thread(target=artists_request, daemon=True).start()

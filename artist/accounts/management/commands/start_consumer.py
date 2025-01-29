from django.core.management.base import BaseCommand
from accounts.consumers import artists_request

class Command(BaseCommand):
    help = 'Start the artists Kafka consumer'

    def handle(self, *args, **kwargs):
        self.stdout.write("Starting Kafka consumer for artists...")
        artists_request()
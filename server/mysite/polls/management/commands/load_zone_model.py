from django.core.management.base import BaseCommand, CommandError
from os import path
import mysite
from pprint import pprint

# Raw Data Path names
MYSITE = mysite.__path__[0]
ZONES = path.join(MYSITE, 'raw_data', 'zones')

# Models
from polls.models import Zone

class Command(BaseCommand):
    help = "Load initial Zone data into Zone Table"

    def handle(self, *args, **options):
        self.stdout.write("Successfully Load initial Zone data")

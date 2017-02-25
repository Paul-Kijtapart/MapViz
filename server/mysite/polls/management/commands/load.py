from django.core.management.base import BaseCommand, CommandError
import csv
import json
from os import path
import mysite

# Raw Data Path names
MYSITE_PATH = mysite.__path__[0]
RAW_DATA_PATH = path.join(MYSITE_PATH, 'raw_data')
ZONES_PATH = path.join(RAW_DATA_PATH, 'zones')
CRASHES = path.join(RAW_DATA_PATH,'CRASHES.csv')

AGRICULTURAL = path.join(ZONES_PATH, 'AGRICULTURAL.json')





# Models
from polls.models import Incident


class Command(BaseCommand):
    help = 'Load initial data into DB'

    def load_zone_data(self):
        pass

    def load_coordinate_data(self):
        pass

    def handle(self, *args, **options):
        with open(CRASHES, 'rb') as csvfile:
            reader = csv.reader((x.replace('\0', '') for x in csvfile), delimiter=',', quotechar='|')
            for idx, row in enumerate(reader):
                if idx != 0 and len(row) != 0:
                    inc = Incident()
                    inc.count = row[1]
                    inc.name = "CRASH"
                    inc.lat = row[3]
                    inc.lon = row[6]
                    inc.year = row[8]
                    print(inc)

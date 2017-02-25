from django.core.management.base import BaseCommand, CommandError
import csv
from os import path
import mysite

# Raw Data Path names
MYSITE = mysite.__path__[0]
RAW_DATA_PATH = path.join(MYSITE, 'raw_data')
CRASHES = path.join(RAW_DATA_PATH, 'CRASHES.csv')

# Models
from polls.models import Incident


class Command(BaseCommand):
    help = 'Load initial Incident data into Incident Table'

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

from django.core.management.base import BaseCommand, CommandError
import csv
from os import path
import mysite

# Raw Data Path names
MYSITE = mysite.__path__[0]
RAW_DATA_PATH = path.join(MYSITE, 'raw_data')
POLICE = path.join(RAW_DATA_PATH, 'POLICE.csv')
HOSPITALS = path.join(RAW_DATA_PATH, 'HOSPITALS.csv')
SCHOOLS = path.join(RAW_DATA_PATH, 'SCHOOLS.csv')
FIELDS = path.join(RAW_DATA_PATH, 'FIELDS.csv')

# Models
from polls.models import Institution

class Command(BaseCommand):
    help = 'Load initial institution data into Institution Table'

    def parseInstitutions(self, reader, name_index, lat_index, lon_index):
      for idx, row in enumerate(reader):
        if idx != 0 and len(row) != 0:
          ins = Institution()
          ins.name = row[name_index]
          ins.lat = float(row[lat_index])
          ins.lon = float(row[lon_index])
          # TODO: Map to the right zone.
          # TODO: ins.zone_name = ...
          # TODO: ins.save()
          print(ins.name, ins.lat, ins.lon)

    def handle(self, *args, **options):
        with open(POLICE, 'rb') as csvfile:
          reader = csv.reader((x.replace('\0', '') for x in csvfile), delimiter=',', quotechar='|')
          self.parseInstitutions(reader, 0, 33, 34)

        with open(HOSPITALS, 'rb') as csvfile:
          reader = csv.reader((x.replace('\0', '') for x in csvfile), delimiter=',', quotechar='"')
          self.parseInstitutions(reader, 0, 33, 34)

        with open(SCHOOLS, 'rb') as csvfile:
          reader = csv.reader((x.replace('\0', '') for x in csvfile), delimiter=',', quotechar='"')
          self.parseInstitutions(reader, 0, 33, 34)

        with open(FIELDS, 'rb') as csvfile:
          reader = csv.reader((x.replace('\0', '') for x in csvfile), delimiter=',', quotechar='"')
          self.parseInstitutions(reader, 2, 0, 1)




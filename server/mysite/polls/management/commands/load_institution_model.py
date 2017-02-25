import pickle

from django.core.management.base import BaseCommand, CommandError
import csv
from os import path, pardir
import mysite
from .GeoUtils import GeoUtils
from pprint import pprint
import polls

# Raw Data Path names
MYSITE = mysite.__path__[0]
RAW_DATA_PATH = path.join(MYSITE, 'raw_data')
POLICE = path.join(RAW_DATA_PATH, 'POLICE.csv')
HOSPITALS = path.join(RAW_DATA_PATH, 'HOSPITALS.csv')
SCHOOLS = path.join(RAW_DATA_PATH, 'SCHOOLS.csv')
FIELDS = path.join(RAW_DATA_PATH, 'FIELDS.csv')
ZONE_NAME_TO_POLYGON_PATH = \
    path.join(path.abspath(path.join(mysite.__path__[0], pardir)), 'temp.py')

# Models
from polls.models import Institution


class Command(BaseCommand):
    help = 'Load initial institution data into Institution Table'
    with open(ZONE_NAME_TO_POLYGON_PATH, 'r') as read_file:
        zone_name_to_polygon_dict = pickle.load(read_file)

    def parseInstitutions(self, reader, name_index, lat_index, lon_index):
        valid_incident_rows = []
        for idx, row in enumerate(reader):
            if idx == 3:
                break

            if idx != 0 and len(row) != 0:
                ins = Institution()
                ins.name = row[name_index]
                ins.lon = float(row[lat_index])
                ins.lat = float(row[lon_index])

                matched_zone = GeoUtils().isIncidentInPolygon((ins.lat, ins.lon), self.zone_name_to_polygon_dict)
                if (matched_zone != None):
                    ins.zone_name = matched_zone
                    pprint(ins)
                    valid_incident_rows.append(ins)

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

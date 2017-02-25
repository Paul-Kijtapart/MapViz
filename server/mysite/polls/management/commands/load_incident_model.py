from django.core.management.base import BaseCommand, CommandError
import csv
from os import path
import mysite
from .GeoUtils import GeoUtils
from pprint import pprint
import pickle

# Raw Data Path names
MYSITE = mysite.__path__[0]
RAW_DATA_PATH = path.join(MYSITE, 'raw_data')
CRASHES = path.join(RAW_DATA_PATH, 'CRASHES.csv')

# Models
from polls.models import Incident
from polls.models import Zone
from polls.models import Coordinate


class Command(BaseCommand):
    help = 'Load initial Incident data into Incident Table'

    def handle(self, *args, **options):
        # zone_name_to_polygon_dict = self.get_zone_name_to_polygon_dict()
        #
        # with open('temp.py', 'w') as write_file:
        #     pickle.dump(zone_name_to_polygon_dict, write_file)

        with open('temp.py', 'r') as read_file:
            zone_name_to_polygon_dict = pickle.load(read_file)
        valid_incident_rows = []

        with open(CRASHES, 'rb') as csvfile:
            reader = csv.reader((x.replace('\0', '') for x in csvfile), delimiter=',', quotechar='|')
            # Normalize values
            minCount = 1000
            maxCount = 0
            for idx, row in enumerate(reader):
                if idx != 0 and len(row) != 0:
                    count = int(row[1])
                    minCount = min(minCount, count)
                    maxCount = max(maxCount, count)
            # go back to beginning of file to start reading again
            csvfile.seek(0)
            reader = csv.reader((x.replace('\0', '') for x in csvfile), delimiter=',', quotechar='|')
            for idx, row in enumerate(reader):
                if idx != 0 and len(row) != 0:
                    inc = Incident()
                    inc.count = self.normalize(int(row[1]), minCount, maxCount)
                    inc.name = "CRASH"
                    inc.lon = float(row[6])
                    inc.lat = float(row[3])
                    inc.year = row[8]

                    matched_zone = GeoUtils().isIncidentInPolygon((inc.lat, inc.lon), zone_name_to_polygon_dict)
                    if (matched_zone != None):
                        inc.zone_name = matched_zone
                        pprint(inc)
                        valid_incident_rows.append(inc)

            pprint(valid_incident_rows)


    def get_zone_name_to_polygon_dict(self):
        coordinate_rows = Coordinate.objects.all()
        zone_name_to_polygon_dict = {}
        for c_row in coordinate_rows:
            key = c_row.name.name
            location = (c_row.lon, c_row.lat)
            if (key in zone_name_to_polygon_dict):
                zone_name_to_polygon_dict[key].append(location)
            else:
                zone_name_to_polygon_dict[key] = list()
                zone_name_to_polygon_dict[key].append(location)
        return zone_name_to_polygon_dict

    def normalize(self, item, min_item, max_item):
        return (item - min_item) / float(max_item - min_item)

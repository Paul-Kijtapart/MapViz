from django.core.management.base import BaseCommand, CommandError
import csv
from os import path
import mysite
from .GeoUtils import GeoUtils
from pprint import pprint
import pickle
# import codecs


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

        # with open('temp.py', 'wb') as write_file:
        #     pickle.dump(zone_name_to_polygon_dict, write_file)

        with open('temp.py', 'rb') as read_destination:
            zone_name_to_polygon_dict = pickle.load(read_destination)

        # pprint(zone_name_to_polygon_dict)

        valid_incident_rows = []

        with open(CRASHES, 'rb') as csvfile:
            reader = csv.reader((x.replace('\0', '') for x in csvfile), delimiter=',', quotechar='|')
            for idx, row in enumerate(reader):
                if idx != 0 and len(row) != 0:
                    inc = Incident()
                    inc.count = row[1]
                    inc.name = "CRASH"
                    inc.lat = float(row[3])
                    inc.lon = float(row[6])
                    inc.year = row[8]

                    if (self.isIncidentInZone(inc, zone_name_to_polygon_dict)):
                        valid_incident_rows.append(inc)

            pprint(valid_incident_rows)


    def get_zone_name_to_polygon_dict(self):
        coordinate_rows = Coordinate.objects.all()
        zone_name_to_polygon_dict = {}
        for c_row in coordinate_rows:
            key = c_row.name
            location = (float(c_row.lat), float(c_row.lon))
            if (key in zone_name_to_polygon_dict):
                zone_name_to_polygon_dict[key].append(location)
            else:
                zone_name_to_polygon_dict[key] = list()
                zone_name_to_polygon_dict[key].append(location)
        return zone_name_to_polygon_dict

    def isIncidentInZone(self, inc, zone_name_to_polygon_dict):
        for zone_name in zone_name_to_polygon_dict:
            current_polygon = zone_name_to_polygon_dict[zone_name]
            if (GeoUtils().isInside(current_polygon, (inc.lat, inc.lon))):
                matched_zone = Zone.objects.get(pk=zone_name)
                inc.zone_name = matched_zone
                return True
        return False

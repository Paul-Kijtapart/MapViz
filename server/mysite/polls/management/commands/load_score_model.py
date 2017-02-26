from django.core.management.base import BaseCommand, CommandError
import json
from os import path
from os import listdir
import mysite
from pprint import pprint
from GeoUtils import *

# Models
from polls.models import Incident
from polls.models import Coordinate
from polls.models import Institution
from polls.models import Zone
from polls.models import Score


class Command(BaseCommand):
    help = 'Calculate score Table'

    def handle(self, *args, **options):
        zones = Zone.objects.all()
        i = 0
        for z in zones:
            if i == 10:
                break

            score = 0
            institutions = Institution.objects.all()
            for ins in institutions:
                score = score + 1  # TODO: dan function here

            incidents = Incident.objects.filter(zone_name=z.name).order_by('year')

            pprint(incidents)
            i += 1

            '''
            s = None
            y = None
            for inc in incidents:
              crash_count = 1 if int(inc.count) == 0 else inc.count
              s = Score()
              s.score = score
              y = int(inc.year)
              s.year = y
              s.name = z.name
              s.score = int(s.score) + (1/float(crash_count))
              pprint(s)
            '''

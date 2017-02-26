from django.core.management.base import BaseCommand, CommandError
from pprint import pprint
from GeoUtils import *

# Models
from polls.models import Incident, Coordinate, Institution, Zone, Score

class Command(BaseCommand):
  help = 'Calculate score Table'

  def handle(self, *args, **options):
    Score.objects.all().delete()
    zones = Zone.objects.all()
    for zone in zones:
      zone_name = zone.name
      p1 = (zone.center_lat, zone.center_lon)
      score = 0
      institutions = Institution.objects.all()
      for ins in institutions:
        # score = weight * distance
        # weight is base on the type of institution
        # TODO add type column to institution table
        p2 = (ins.lat, ins.lon)
        score = GeoUtils().distance(p1, p2)

      incidents = Incident.objects.filter(zone_name=zone_name)
      for inc in incidents:
        # score = weight * crash score
        crash_score = 1 - inc.norm_count
        score += crash_score
        scoreObj = Score(name=zone_name, score=score, year=inc.year)
        pprint(scoreObj)



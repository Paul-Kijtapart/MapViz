from django.core.management.base import BaseCommand, CommandError
from pprint import pprint
from .GeoUtils import GeoUtils

# Models
from polls.models import Incident, Coordinate, Institution, Zone, Score


class Command(BaseCommand):
    help = 'Calculate score Table'

    def handle(self, *args, **options):
      Score.objects.all().delete()
      scores = self.get_scores()

    def get_scores(self):
      zones = Zone.objects.all()
      scores = []
      for zone in zones:
          zone_name = zone.name
          zone_coord = (zone.center_lat, zone.center_lon)
          institution_score = self.get_inst_score_for_zone(zone_coord)
          years_to_crash_count_dict = self.get_year_to_crash_score_dict(zone_name)
          for year, crash_score in years_to_crash_count_dict.iteritems():
              total_score = crash_score + institution_score
              score = Score(name=zone_name, score=total_score, year=year)
              scores.append(score)

      scale_min = 1
      scale_max = 5
      score_vals = map(lambda s: s.score,scores)
      score_min = min(score_vals)
      score_max = max(score_vals)

      for s in scores:
        score = s.score
        # newvalue = a * value + b. a = (max'-min')/(max-min) and b = max' - a * max
        a = (scale_max - scale_min)/(score_max - score_min)
        b = scale_max - a * score_max
        score_scaled = a * score + b
        s.score = round(score_scaled)
        pprint(s)
        s.save()

    def get_inst_weights(self):
      weights = dict()
      weights['Sports Fields'] = 0.6
      weights['Hospital'] = 0.8
      weights['Police'] = 0.7
      weights['School Public'] = 0.5
      return weights

    def get_inst_score_for_zone(self, zone_coord):
      inst_weight = self.get_inst_weights();
      institution_score = 0
      institutions = Institution.objects.all()
      for ins in institutions:
          # score = weight * distance
          # weight is base on the type of institution
          inst_coord = (ins.lat, ins.lon)
          distance = GeoUtils().distance(zone_coord, inst_coord)
          institution_score += inst_weight[ins.institution_type] * distance
      return institution_score

    def get_year_to_crash_score_dict(self, zone_name):
      incidents = Incident.objects.filter(zone_name=zone_name)
      crash_scores = dict()
      for inc in incidents:
          current_year = inc.year
          current_score = 1 - inc.norm_count
          if current_year in crash_scores:
              crash_scores[current_year] += current_score
          else:
              crash_scores[current_year] = current_score
      for year, crash_score in crash_scores.iteritems():
        # score = weight * crash_score
        crash_scores[year] = 0.9 * crash_score
      return crash_scores

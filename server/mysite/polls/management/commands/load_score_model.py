from django.core.management.base import BaseCommand, CommandError
from pprint import pprint
from .GeoUtils import GeoUtils

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
                score += GeoUtils().distance(p1, p2)

            incidents = Incident.objects.filter(zone_name=zone_name)
            years_to_crash_count_dict = \
                self.get_year_to_crash_count_dict(incidents, zone_name)

            for year in years_to_crash_count_dict:
                score = Score(name=zone_name, score=years_to_crash_count_dict.get(year) + score, year=year)
                pprint(score)

                # for inc in incidents:
                #     # score = weight * crash score
                #     crash_score = 1 - inc.norm_count
                #     score += crash_score
                #     scoreObj = Score(name=zone_name, score=score, year=inc.year)
                #     pprint(scoreObj)

    def get_year_to_crash_count_dict(self, incidents, zone_name):
        '''
        {yaer: crash_count}
        :param incidents:
        :param zone_name:
        :return:
        '''
        res = dict()
        for inc in incidents:
            current_year = inc.year
            current_score = 1 - inc.norm_count
            if current_year in res and res[current_year] != None:
                current_year[current_year] += current_score
            else:
                current_year[current_year] = current_score
        return res

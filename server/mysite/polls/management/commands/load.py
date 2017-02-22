from django.core.management.base import BaseCommand, CommandError

import csv
from polls.models import Incident
path = '../../db/raw_data/CRASHES.csv'

class Command(BaseCommand):
	help = 'Load initial data into DB'
	def handle(self, *args, **options):
		with open(path, 'rb') as csvfile:
			reader = csv.reader((x.replace('\0', '') for x in csvfile), delimiter=',', quotechar='|')
			for idx, row in enumerate(reader):
				if idx != 0 and len(row) != 0:
					inc = Incident()
					inc.count = row[1]
					inc.name = "CRASH"
					inc.lat = row[3]
					inc.lon = row[6]
					inc.year = row[8]
					print inc
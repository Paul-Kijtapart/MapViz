from django.http import HttpResponse, JsonResponse
import json
from models import Score
import random

def index(request):
    return ("Hello, world. You're at the polls index.")

def score(request, year):
  scores = Score.objects.filter(year=year)
  # transform into simple objects without django internal props (eg. pk)
  transformedScores = map(lambda s: \
    {'name': s.name, 'year': s.year, 'score': s.score}, scores)
  data = json.dumps(transformedScores)
  return HttpResponse(data, content_type='application/json')

def sentiment(request):
  return JsonResponse({'areas': Sentiment().getAreas()});

# SAMPLE MOCK DATA GENERATOR JUST FOR DEMO
class Sentiment():
  # Try to get random points across New Westminster
  def getAreas(self):
    return [ \
      {'lat': random.uniform(49.204196, 49.216980), 'lon': random.uniform(-122.930042, -122.907726)}, \
      {'lat': random.uniform(49.200607, 49.208346), 'lon': random.uniform(-122.945663, -122.925922)}, \
      {'lat': random.uniform(49.222250, 49.229201), 'lon': random.uniform(-122.907211, -122.887813)}, \
      {'lat': random.uniform(49.186135, 49.191520), 'lon': random.uniform(-122.952186, -122.934849)}, \
      {'lat': random.uniform(49.225389, 49.233348), 'lon': random.uniform(-122.913391, -122.9)}]

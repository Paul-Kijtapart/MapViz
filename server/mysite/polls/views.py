from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
from models import Score


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def score(request, year):
	data = serializers.serialize('json', Score.objects.filter(year=year))
	return HttpResponse(data, content_type='application/json')
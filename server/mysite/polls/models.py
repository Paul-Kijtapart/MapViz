from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Zone(models.Model):
    name = models.IntegerField(primary_key=True)
    zone_type = models.CharField(max_length=30)

class Coordinate(models.Model):
    name = models.ForeignKey(Zone, on_delete=models.CASCADE)
    lat = models.FloatField()
    lon = models.FloatField()

class Score(models.Model):
    name = models.IntegerField()
    year = models.IntegerField()
    score = models.IntegerField()


class Incident(models.Model):
    name = models.CharField(max_length=30)
    lat = models.FloatField()
    lon = models.FloatField()
    year = models.IntegerField()
    count = models.IntegerField()
    zone_name = models.ForeignKey(Zone, on_delete=models.CASCADE)

class Institution(models.Model):
    name = models.CharField(max_length=30)
    lat = models.FloatField()
    lon = models.FloatField()
    zone_name = models.ForeignKey(Zone, on_delete=models.CASCADE)

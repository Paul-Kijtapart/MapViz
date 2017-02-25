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
    def __str__(self):
        return ' at ( lat : ' + str(self.lat)  + ' , lon : ' + str(self.lon) + ') '


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

    def __unicode__( self ):
        return "INCIDENT: name {0} latlon ({1},{2}), year {3}, count{4}".format( self.name, self.lat, self.lon, self.year, self.count)

class Institution(models.Model):
    name = models.CharField(max_length=30)
    lat = models.FloatField()
    lon = models.FloatField()
    zone_name = models.ForeignKey(Zone, on_delete=models.CASCADE)

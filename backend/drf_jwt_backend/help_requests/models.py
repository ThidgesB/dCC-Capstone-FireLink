from xmlrpc.client import DateTime
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class PlatformType(models.Model):
    platform_name = models.CharField(max_length=50)
    platform_description = models.CharField(max_length=100)

class HelpRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    platform = models.ForeignKey(PlatformType, on_delete=models.CASCADE)
    date_posted = models.DateTimeField()
    game = models.CharField(max_length=50)
    details = models.CharField(max_length=500)
    active_state = models.BooleanField()
    players_requested = models.IntegerField()
    

class ActiveHelpers(models.Model):
    is_active = models.BooleanField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    request = models.ForeignKey(HelpRequest, on_delete=models.CASCADE)

class RequestType(models.Model):
    request_type = models.CharField(max_length=25)
    type_description = models.CharField(max_length=75)
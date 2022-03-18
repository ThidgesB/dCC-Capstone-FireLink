from pickle import TRUE
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class ForumPost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    body = models.CharField(max_length=1000)
    date_posted = models.DateTimeField()


class Comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(ForumPost, on_delete=models.CASCADE)
    date_posted = models.DateTimeField()
    text = models.CharField(max_length=500)
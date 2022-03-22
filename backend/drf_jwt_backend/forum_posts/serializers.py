from rest_framework import serializers
from .models import ForumPost, Comments, PostRating
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model =  User
        fields = ['id', 'username']

class ForumPostSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = ForumPost
        fields = ['id', 'title', 'body', 'date_posted', 'user', 'rating']


class CommentsSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Comments
        fields = ['id', 'post', 'date_posted', 'text', 'user']

class PostRatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostRating
        fields = ['id', 'score', 'post', 'user_id']

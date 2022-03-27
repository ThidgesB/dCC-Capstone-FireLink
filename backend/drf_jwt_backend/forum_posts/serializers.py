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

class SteamNewsArticleSerializer(serializers.Serializer):
    gid = serializers.CharField()
    title = serializers.CharField()
    url = serializers.CharField()
    is_external_url = serializers.BooleanField()
    author = serializers.CharField()
    feedlabel = serializers.CharField()
    date = serializers.IntegerField()
    feedname = serializers.CharField()
    feed_type = serializers.IntegerField()
    appid = serializers.IntegerField()

        # class Meta:
        #     model = SteamNewsArticle
        #     managed = False
            # fields = ['gid', 'title', 'url', 'is_external_url', 'author', 'feedlabel', 'date', 'feedname', 'feed_type', 'appid']

class AppNewsSerializer(serializers.Serializer):
    appid = serializers.CharField()
    newsitems = SteamNewsArticleSerializer()


        # newsitems = SteamNewsArticleSerializer(many=True, read_only = True)
        # class Meta:
        #     managed = False
            # fields = ['appid','newsitems']
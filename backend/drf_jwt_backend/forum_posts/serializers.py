from rest_framework import serializers
from .models import ForumPost, Comments, PostRating



class ForumPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = ForumPost
        fields = ['id', 'title', 'body', 'date_posted', 'user_id', 'rating']


class CommentsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comments
        fields = ['id', 'post', 'date_posted', 'text', 'user_id']

class PostRatingSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostRating
        fields = ['id', 'score', 'post', 'user_id']
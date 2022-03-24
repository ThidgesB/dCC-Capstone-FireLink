from platform import platform
from rest_framework import serializers
from .models import ActiveHelpers, HelpRequest, PlatformType, RequestType
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model =  User
        fields = ['id', 'username']


# class PlatformSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = 

class PlatformTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = PlatformType
        fields = ['id', 'platform_name', 'platform_description']


class PostHelpRequestSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    
    class Meta:
        model = HelpRequest
        fields = ['id', 'date_posted', 'game', 'details', 'active_state', 'players_requested', 'platform', 'user_id', 'user']

class HelpRequestSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    platform = PlatformTypeSerializer(many=False, read_only=True)
    class Meta:
        model = HelpRequest
        fields = ['id', 'date_posted', 'game', 'details', 'active_state', 'players_requested', 'platform', 'user_id', 'user']


class ActiveHelperSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = ActiveHelpers
        fields = ['id', 'is_active', 'request_id', 'user_id']

class RequestType(serializers.ModelSerializer):
    model = RequestType
    fields = ['id', 'request_type', 'type_description']
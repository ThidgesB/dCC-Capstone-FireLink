from rest_framework import serializers
from .models import ActiveHelpers, HelpRequest, PlatformType, RequestType







class HelpRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = HelpRequest
        fields = ['id', 'date_posted', 'game', 'details', 'active_state', 'players_requested', 'platform_id', 'user_id']

class PlatformTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = PlatformType
        fields = ['id', 'platform_name', 'platform_description']

class ActiveHelperSerializer(serializers.ModelSerializer):

    class Meta:
        model = ActiveHelpers
        fields = ['id', 'is_active', 'request_id', 'user_id']

class RequestType(serializers.ModelSerializer):
    model = RequestType
    fields = ['id', 'request_type', 'type_description']
from django.http import Http404
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import PlatformType
from .models import RequestType
from .models import HelpRequest
from .models import ActiveHelpers
from .serializers import HelpRequestSerializer, PlatformTypeSerializer, ActiveHelperSerializer, PostHelpRequestSerializer
from django.contrib.auth.models import User
# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_help_requests(request):
    requests = HelpRequest.objects.all()
    serializer = HelpRequestSerializer(requests, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_help_requests(request):
    print('User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = PostHelpRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        requests = HelpRequest.objects.filter(user_id=request.user.id)
        serializer = HelpRequestSerializer(requests, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_platforms(request):
    platforms = PlatformType.objects.all()
    serializer = PlatformTypeSerializer(platforms, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_platforms(request):
    serializer = PlatformTypeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_platform(request, pk):
    try:
        platform = PlatformType.objects.get(pk=pk)
    except PlatformType.DoesNotExist:
        raise Http404
    serializer = PlatformTypeSerializer(platform, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def active_helpers(request):
    if request.method == 'POST':
        serializer = ActiveHelperSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        requests = ActiveHelpers.objects.filter(user_id=request.user.id)
        serializer = ActiveHelperSerializer(requests, many=True)
        return Response(serializer.data)
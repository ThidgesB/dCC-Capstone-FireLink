from msilib.schema import AppId
from xml.etree.ElementTree import Comment
from django.http import Http404
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import ForumPost, Comments, PostRating
from .serializers import ForumPostSerializer, CommentsSerializer, PostRatingSerializer
from django.contrib.auth.models import User
from rest_framework.request import Request
import http.client
from django.http import JsonResponse


# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_forum_posts(request):
    posts = ForumPost.objects.all()
    serializer = ForumPostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_ratings(request):
    ratings = PostRating.objects.all()
    serializer = PostRatingSerializer(ratings, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_comments(request):
    comments = Comments.objects.all()
    serializer = CommentsSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_forum_posts(request):
    if request.method == 'POST':
        serializer = ForumPostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        posts = ForumPost.objects.filter(user_id=request.user.id)
        serializer = ForumPostSerializer(posts, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_comments(request):
    if request.method == 'POST':
        serializer = CommentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        comments = Comments.objects.filter(user_id=request.user.id)
        serializer = CommentsSerializer(comments, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_ratings(request):
    if request.method == 'POST':
        serializer = PostRatingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        print(request.id)
        ratings = PostRating.objects.all()
        serializer = PostRatingSerializer(ratings, many=True)
        return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_post(request, pk):
    try:
        post = ForumPost.objects.get(pk=pk)
    except ForumPost.DoesNotExist:
        raise Http404
    serializer = ForumPostSerializer(post, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_comment(request, pk):
    try:
        comment = Comments.objects.get(pk=pk)
    except Comments.DoesNotExist:
        raise Http404
    serializer = CommentsSerializer(comment, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_post(request, pk):
    try:
        post = ForumPost.objects.get(pk=pk)
    except ForumPost.DoesNotExist:
        raise Http404
    if request.method == 'DELETE':
        operation = post.delete()
        data = {}
        if operation:
            data["success"] = "delete successful"
        else:
            data["failure"] = "delete failed"
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_comment(request, pk):
    try:
        comment = Comments.objects.get(pk=pk)
    except Comments.DoesNotExist:
        raise Http404
    if request.method == 'DELETE':
        operation = comment.delete()
        data = {}
        if operation:
            data["success"] = "delete successful"
        else:
            data["failure"] = "delete failed"
    return Response(status=status.HTTP_204_NO_CONTENT)

# Steamworks Web API doesn't allow front end servers to make requests.
# Successful tests in postman were not indicative of success on the front end
# 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_steam_news(request, app_news_request):
    conn = http.client.HTTPSConnection("api.steampowered.com")
    payload = ''
    headers = {}
    # Split on comma, builds an array of two strings
    app_info = app_news_request.split(',')
    # remove front single quote
    app_id = app_info[0].strip("'")
    # remove back single quote
    news_source = app_info[1].strip("'")
    url = f"/ISteamNews/GetNewsForApp/v2/?appid=" + app_id + "&count=5&feeds=" + news_source 
    conn.request("GET", url, payload, headers)
    res = conn.getresponse()
    response = res.read()
    return Response(response)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_souls_news(request, app_id):
#     conn = http.client.HTTPSConnection("api.steampowered.com")
#     payload = ''
#     headers = {}
#     app_info = app_id.split(',')
#     app_id = app_info[0].strip("'") 
#     news_source = app_info[1].strip("'")
#     app_id_to_string = f'{app_id}'
#     url = f"/ISteamNews/GetNewsForApp/v2/?appid=" + app_id + &feeds=PCGamesN"
#     conn.request("GET", url, payload, headers)
#     res = conn.getresponse()
#     response = res.read()
#     return Response(response)
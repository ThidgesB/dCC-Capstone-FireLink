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

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_forum_posts(request):
    posts = ForumPost.objects.all()
    serializer = ForumPostSerializer(posts, many=True)
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
from django.urls import path, include
from forum_posts import views

urlpatterns = [
    path('', views.get_all_forum_posts),
    path('user/posts/', views.user_forum_posts),
    path('user/comments/', views.user_comments),
    path('all/ratings/', views.get_all_ratings),
    path('user/editpost/<int:pk>/', views.edit_post),
    path('user/editcomment/<int:pk>/', views.edit_comment),
    path('comments/', views.get_all_comments),
    path('user/deletepost/<int:pk>/', views.delete_post),
    path('user/deletecomment/<int:pk>/', views.delete_comment),
    path('steamexternal/<app_news_request>/', views.get_steam_news),
]
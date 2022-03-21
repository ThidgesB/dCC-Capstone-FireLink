from django.urls import path, include
from forum_posts import views

urlpatterns = [
    path('', views.get_all_forum_posts),
    path('user/posts/', views.user_forum_posts),
    path('user/comments/', views.user_comments),
    path('all/ratings/', views.user_ratings),
    path('user/editpost/<int:pk>/', views.edit_post),
    path('user/editcomment/<int:pk>/', views.edit_comment)
]
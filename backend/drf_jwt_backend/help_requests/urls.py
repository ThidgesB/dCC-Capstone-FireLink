from django.urls import path, include
from help_requests import views

urlpatterns = [
    path('', views.user_help_requests),
    path('all/requests/', views.get_all_help_requests),
    path('all/platforms/', views.get_all_platforms),
    path('user/requests/', views.user_help_requests),
    path('user/requests/delete/<int:pk>/', views.delete_request),
    path('user/requests/edit/<int:pk>/', views.edit_request)
]
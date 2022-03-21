from django.contrib import admin
from .models import ForumPost, Comments, PostRating
# Register your models here.
admin.site.register(ForumPost)
admin.site.register(Comments)
admin.site.register(PostRating)
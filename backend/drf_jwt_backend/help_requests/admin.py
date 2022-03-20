from django.contrib import admin
from .models import HelpRequest, PlatformType, ActiveHelpers


# Register your models here.
admin.site.register(HelpRequest)
admin.site.register(PlatformType)
admin.site.register(ActiveHelpers)
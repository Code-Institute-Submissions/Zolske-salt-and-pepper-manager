from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Comments


class commentsAdmin(admin.ModelAdmin):
    model = Comments
    list_display = [
        "author",
        "approved",
        "rating",
        "date",
    ]
    
admin.site.register(Comments, commentsAdmin)
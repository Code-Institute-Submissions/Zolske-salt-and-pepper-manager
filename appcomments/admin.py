from django.contrib import admin
from .models import Comments


class CommentsAdmin(admin.ModelAdmin):
    model = Comments
    list_display = [
        "author",
        "approved",
        "name",
        "rating",
        "date",
    ]
    

admin.site.register(Comments, CommentsAdmin)

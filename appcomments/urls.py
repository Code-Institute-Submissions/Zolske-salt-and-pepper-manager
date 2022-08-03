from django.urls import path
from . import views

urlpatterns = [
    path('', views.comments, name='comment'),
    path('add_comment', views.add_comments, name='add_comment'),
]

from django.urls import path
from . import views
# from .views import HomePageView

urlpatterns = [
    path("", views.homePageView, name="home"),
]

from django.urls import path
from .views import SignUpView
from . import views

urlpatterns = [
    path("signup/", SignUpView.as_view(), name="signup"),
    path("", views.user_settings, name="user_settings"),
    path("user_settings_profile/", views.user_settings_profile, name="user_settings_profile"),
]
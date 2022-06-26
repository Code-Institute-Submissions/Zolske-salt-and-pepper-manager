from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
# User = settings.AUTH_USER_MODEL


class CustomUser(AbstractUser):
    profile_picture = models.CharField(max_length=255)

def __str__(self):
    return self.username

# class User_Settings(models.Model):  
#     user_name = models.ForeignKey(User, on_delete=models.CASCADE)
#     profile_picture = models.CharField(max_length=255)
    
# def __str__(self):
#     return "%s" % (self.user_name)
    
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings


class CustomUser(AbstractUser):
    profile_picture = models.CharField(max_length=255)


def __str__(self):
    return self.username

    
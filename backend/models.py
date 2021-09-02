from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    score = models.IntegerField(blank=True, default=0)

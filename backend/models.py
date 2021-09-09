from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    score = models.IntegerField(blank=True, default=0)

class Puzzle(models.Model):
    name = models.CharField(max_length=30)
    creator = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateField()
    given_digits = models.CharField(max_length=81)
    cell_colors = models.CharField(max_length=81)
    average_solve_time = models.TimeField(auto_now=False, auto_now_add=False, blank=True)
    completed = models.BooleanField()
    rule_set = models.TextField()
    average_rating = models.FloatField(blank=True)
    diagonals = models.IntegerField()


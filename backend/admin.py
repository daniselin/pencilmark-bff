from django.contrib import admin
from .models import CustomUser, Puzzle

class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser

class PuzzleAdmin(admin.ModelAdmin):
    model = Puzzle

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Puzzle, PuzzleAdmin)

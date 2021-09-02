from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('', views.index),  # for the empty url
    url(r'^.*/$', views.index)  # for all other urls
]
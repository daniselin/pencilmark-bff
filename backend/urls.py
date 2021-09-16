from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from . import views

urlpatterns = [
    path('user/create/', views.CustomUserCreate.as_view(), name="create_user"),
    path('user/', views.CustomUserGet.as_view(), name="get_user"),
    path('puzzle/create/', views.PuzzleCreate.as_view(), name="create_puzzle"),
    path('token/obtain/', views.ObtainTokenPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', views.HelloWorldView.as_view(), name='hello_world'),
    path('logout/', views.LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='logout'),
    path('token/verify/', views.VerifyToken.as_view(), name='token_verify'),
    path('puzzle/check', views.CheckPuzzle.as_view(), name='check_puzzle')
]
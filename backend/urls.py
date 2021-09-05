from django.urls import path
from .views import ObtainTokenPairView, CustomUserCreate, HelloWorldView, LogoutAndBlacklistRefreshTokenForUserView, VerifyToken
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain/', ObtainTokenPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
    path('token/verify/', VerifyToken.as_view(), name='token_verify')
]
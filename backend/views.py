from rest_framework import status, permissions

from .serializers import PuzzleSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer
from .serializers import PuzzleSerializer


class ObtainTokenPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                if user:
                    json = serializer.data
                    return Response(json, status=status.HTTP_201_CREATED)
            except Exception as error:
                if 'username' in str(error):
                    return Response({'error': 'username duplicate'}, status=status.HTTP_409_CONFLICT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ObtainTokenPairWithColorView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class HelloWorldView(APIView):

    def get(self, request):
        return Response(data={"hello": "world"}, status=status.HTTP_200_OK)


class CustomUserGet(APIView):
    def get(self, request):
        user = request.user
        if user.is_authenticated:
            return Response(data={'username': user.username, 'email': user.email, 'score': user.score, 'id': user.id},
                            status=status.HTTP_200_OK)


class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class VerifyToken(APIView):
    def get(self, request):
        return Response({'tokenIsValid': True}, status=status.HTTP_200_OK)


class PuzzleCreate(APIView):
    def post(self, request):
        serializer = PuzzleSerializer(data=request.data)
        if serializer.is_valid():
            try:
                puzzle = serializer.save()
                if puzzle:
                    json = serializer.data
                    return Response(json, status=status.HTTP_201_CREATED)
            except Exception as error:
                return Response({'error': 'puzzle name duplicate'}, status=status.HTTP_409_CONFLICT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

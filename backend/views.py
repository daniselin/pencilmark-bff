from django.core.exceptions import ValidationError
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from .serializers import PuzzleSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer
from .serializers import PuzzleSerializer

from .models import Puzzle


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
                loaded_puzzle = request.data["loaded_puzzle"]
                if loaded_puzzle:
                    Puzzle.objects.get(pk=loaded_puzzle).delete()
                if puzzle:
                    json = serializer.data
                    return Response(json, status=status.HTTP_201_CREATED)
            except ValidationError as error:
                return Response({'message': error.message}, status=status.HTTP_409_CONFLICT)

        return Response({'message': serializer.errors}, status=status.HTTP_409_CONFLICT)


class GetProfile(APIView):
    def get(self, request, username):
        user = get_object_or_404(get_user_model(), username=username)
        createdPuzzles = PuzzleSerializer(Puzzle.objects.filter(creator=user.id).filter(completed=True), many=True)
        savedPuzzles = PuzzleSerializer(Puzzle.objects.filter(creator=user.id).filter(completed=False), many=True)

        return Response({'savedPuzzles': savedPuzzles.data, 'createdPuzzles': createdPuzzles.data, 'profile': {'id': user.id, 'username': user.username, 'score': user.score, 'email': user.email}}, status=status.HTTP_200_OK)


class CheckPuzzle(APIView):
    def post(self, request):
        cells = request.data["cells"]
        if len(cells) != 81:
            return Response({'error': 'cells length incorrect: ' + str(len(cells))}, status=status.HTTP_400_BAD_REQUEST)
        else:
            conflictCells = []
            for i in range(len(cells)):
                iCell = cells[i]
                iRow = i % 9 + 1
                iCol = i // 9 + 1
                iBox = 0
                if iCol < 4:
                    iBox = 1
                elif iCol < 7:
                    iBox = 4
                elif iCol < 10:
                    iBox = 7
                if iRow < 4:
                    iBox
                elif iRow < 7:
                    iBox += 1
                elif iRow < 10:
                    iBox += 2

                iCellObj = {"row": iRow, "col": iCol}


                for j in range(len(cells)):
                    jCell = cells[j]
                    jRow = j % 9 + 1
                    jCol = j // 9 + 1
                    jBox = 0
                    if jCol < 4:
                        jBox = 1
                    elif jCol < 7:
                        jBox = 4
                    elif jCol < 10:
                        jBox = 7
                    if jRow < 4:
                        jBox
                    elif jRow < 7:
                        jBox += 1
                    elif jRow < 10:
                        jBox += 2

                    jCellObj = {"row": jRow, "col": jCol}

                    if i != j:
                        if iRow == jRow and iCell != "_" and iCell == jCell:
                            if iCellObj not in conflictCells:
                                conflictCells.append(iCellObj)
                            if jCellObj not in conflictCells:
                                conflictCells.append(jCellObj)

                        if iCol == jCol and iCell != "_" and iCell == jCell:
                            if iCellObj not in conflictCells:
                                conflictCells.append(iCellObj)
                            if jCellObj not in conflictCells:
                                conflictCells.append(jCellObj)

                        if iBox == jBox and iCell != "_" and iCell == jCell:
                            if iCellObj not in conflictCells:
                                conflictCells.append(iCellObj)
                            if jCellObj not in conflictCells:
                                conflictCells.append(jCellObj)
            return Response({"conflictCells": conflictCells}, status=status.HTTP_200_OK)

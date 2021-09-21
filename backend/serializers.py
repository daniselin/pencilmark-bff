from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import CustomUser, Puzzle
from django.db import transaction
from django.db.models import Q


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['score'] = user.score
        return token


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        with transaction.atomic():
            instance.save()
        return instance

    def validate_email(self, value):
        lower_email = value.lower()
        if CustomUser.objects.filter(email__iexact=lower_email).exists():
            raise serializers.ValidationError("Email duplicate")
        return lower_email

    def validate_username(self, value):
        if CustomUser.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("Username duplicate")
        return value


class PuzzleSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    creator = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), required=True)
    date = serializers.DateField(required=True)
    given_digits = serializers.CharField(required=True)
    solution_digits = serializers.CharField(required=True)
    cell_colors = serializers.CharField(required=True)
    average_solve_time = serializers.TimeField(required=False)
    completed = serializers.BooleanField(required=True)
    rule_set = serializers.CharField(required=True)
    average_rating = serializers.FloatField(required=False)
    diagonals = serializers.IntegerField(required=True)
    loaded_puzzle = serializers.IntegerField(required=False)

    class Meta:
        model = Puzzle
        fields = (
            'id', 'name', 'creator', 'date', 'given_digits', 'solution_digits', 'cell_colors', 'average_solve_time', 'completed', 'rule_set',
            'average_rating', 'diagonals', 'loaded_puzzle')

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        with transaction.atomic():
            instance.save()
        return instance

    def validate(self, data):
        name = data['name']
        creator = data['creator']
        given_digits = data['given_digits']
        loaded_puzzle = data['loaded_puzzle']

        same_puzzle_name = Puzzle.objects.filter(name=name)

        if same_puzzle_name.filter(creator=creator).filter(completed=True).exists():
            raise serializers.ValidationError("Puzzle name already exists for this creator.")
        if same_puzzle_name.filter(creator=creator).filter(completed=False).filter(~Q(pk=loaded_puzzle)):
            raise serializers.ValidationError("Puzzle name already exists for this creator.")
        if data["completed"]:
            if same_puzzle_name.filter(given_digits=given_digits).filter(completed=True).exists():
                raise serializers.ValidationError("Puzzle already exists for this creator.")
        else:
            if same_puzzle_name.filter(given_digits=given_digits).exists():
                raise serializers.ValidationError("Puzzle already exists for this creator.")

        data.pop('loaded_puzzle')
        return data

    def get_validation_exclusions(self):
        exclusions = super(PuzzleSerializer, self).get_validation_exclusions()
        return exclusions + ['average_solve_time', 'average_rating']

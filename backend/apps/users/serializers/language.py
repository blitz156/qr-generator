from rest_framework import serializers
from apps.users.models import User

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("language",)

from rest_framework import serializers
from accounts.models import Users
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = [ 'name', 'email', 'password', 'date_of_birth', 'profile_image', 'subscription_type', 'created_at', 'updated_at' 'is_active']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['name'] = validated_data.get('name', 'Anonymous')
        validated_data['subscription_type'] = validated_data.get('subscription_type', 'free')
        user = Users(
        email=validated_data['email'],
        name=validated_data['name'],
        subscription_type=validated_data['subscription_type']
    )
        user.set_password(validated_data['password'])
        user.save()
        return user
        
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        try:
            user = Users.objects.get(email=email)
        except Users.DoesNotExist:
            raise AuthenticationFailed('Invalid credentials')

        if not user.is_active:
            raise AuthenticationFailed('User is inactive')

        if not user.check_password(password):
            raise AuthenticationFailed('Invalid credentials')

        return super().validate(attrs)

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['name'] = user.name
        token['email'] = user.email

        return token
    
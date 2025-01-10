from rest_framework import serializers
from accounts.models import Users
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = [ 'name', 'email', 'password', 'date_of_birth', 'profile_image', 'subscription_type', 'created_at', 'updated_at', 'is_active']
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
    
    def update(self, instance, validated_data):
        
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance
        
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        
        data = super().validate(attrs)
        user = self.user

        if not user.is_active:
            raise AuthenticationFailed('User is inactive')
        
        data['user'] = {
            "name": user.name,
            "email": user.email,
            "date_of_birth": user.date_of_birth,
            "profile_image": user.profile_image.url if user.profile_image else None,
            "subscription_type": user.subscription_type,
            "is_active": user.is_active,
        }

        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['name'] = user.name
        token['email'] = user.email

        return token
    
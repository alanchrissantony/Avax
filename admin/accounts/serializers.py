from rest_framework import serializers
from accounts.models import Admins
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admins
        fields = [
            'id', 'name', 'email', 'password', 'profile_image', 'is_active', 'is_staff', 
            'is_superuser', 'created_at', 'updated_at'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):

        validated_data['name'] = validated_data.get('name', 'Anonymous')
        admin = Admins(
            email=validated_data['email'],
            name=validated_data['name'],
            is_staff=validated_data.get('is_staff', False),
            is_superuser=validated_data.get('is_superuser', False)
        )
        admin.set_password(validated_data['password'])  # Hash the password
        admin.save()
        return admin
    
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
        admin = self.user
        
        data['user'] = {
            "name": admin.name,
            "email": admin.email,
            "profile_image": admin.profile_image.url if admin.profile_image else None,
            "is_active": admin.is_active,
            "is_staff": admin.is_staff,
            "is_superuser": admin.is_superuser,
        }

        return data

    @classmethod
    def get_token(cls, admin):
        token = super().get_token(admin)

        token['name'] = admin.name
        token['email'] = admin.email

        return token
    
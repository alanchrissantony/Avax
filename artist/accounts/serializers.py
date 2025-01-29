from rest_framework import serializers
from accounts.models import Artists
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artists
        fields = [
            'name', 
            'email', 
            'password', 
            'date_of_birth', 
            'profile_image', 
            'bio', 
            'genre', 
            'social_links', 
            'verified', 
            'followers_count', 
            'created_at', 
            'updated_at', 
            'is_active'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
        }

    def create(self, validated_data):
        
        user = Artists(
            email=validated_data.get('email'),
            name=validated_data.get('name', 'Anonymous'),
            date_of_birth=validated_data.get('date_of_birth'),
            profile_image=validated_data.get('profile_image'),
            bio=validated_data.get('bio'),
            genre=validated_data.get('genre'),
            social_links=validated_data.get('social_links'),
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
        
        if not user.verified:
            raise AuthenticationFailed('User is not verified')
        
        data['user'] = {
            "name": user.name,
            "email": user.email,
            "date_of_birth": user.date_of_birth,
            "profile_image": user.profile_image.url if user.profile_image else None,
            "bio": user.bio,
            "genre": user.genre,
            "social_links": user.social_links,
            "verified": user.verified,
            "followers_count": user.followers_count,
            "is_active": user.is_active,
        }

        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['name'] = user.name
        token['email'] = user.email
        token['verified'] = user.verified
        token['followers_count'] = user.followers_count

        return token
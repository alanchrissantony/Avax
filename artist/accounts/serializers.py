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
        }

    def create(self, validated_data):
        print(validated_data)
        artist = Artists(
            email=validated_data.get('email'),
            name=validated_data.get('name', 'Anonymous'),
            date_of_birth=validated_data.get('date_of_birth'),
            profile_image=validated_data.get('profile_image'),
            bio=validated_data.get('bio'),
            genre=validated_data.get('genre'),
            social_links=validated_data.get('social_links'),
        )
        artist.set_password(validated_data['password'])
        artist.save()
        return artist

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
        artist = self.user

        if not artist.is_active:
            raise AuthenticationFailed('User is inactive')
        
        if not artist.verified:
            raise AuthenticationFailed('User is not verified')
        
        data['artist'] = {
            "name": artist.name,
            "email": artist.email,
            "date_of_birth": artist.date_of_birth,
            "profile_image": artist.profile_image.url if artist.profile_image else None,
            "bio": artist.bio,
            "genre": artist.genre,
            "social_links": artist.social_links,
            "verified": artist.verified,
            "followers_count": artist.followers_count,
            "is_active": artist.is_active,
        }

        return data

    @classmethod
    def get_token(cls, artist):
        token = super().get_token(artist)

        token['name'] = artist.name
        token['email'] = artist.email
        token['verified'] = artist.verified
        token['followers_count'] = artist.followers_count

        return token
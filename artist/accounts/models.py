from django.db import models
from django.contrib.auth.models import AbstractUser 
from django.utils import timezone

class Artists(AbstractUser):
    name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    date_of_birth = models.DateField(null=True, blank=True)
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    genre = models.CharField(max_length=100, null=True, blank=True)
    social_links = models.JSONField(null=True, blank=True)
    verified = models.BooleanField(default=False)
    followers_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email
    
    def block(self):
        self.is_active = False
        self.save()

    def unblock(self):
        self.is_active = True
        self.save()

    def verify(self):
        self.verified = True
        self.save()
    

class OTP(models.Model):
    email = models.EmailField()
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return timezone.now() > self.created_at + timezone.timedelta(minutes=1)
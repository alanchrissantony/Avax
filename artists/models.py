from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    date_of_birth = models.DateField(null=True, blank=True)
    stage_name = models.CharField(max_length=255, null=True, blank=True)
    biography = models.TextField(null=True, blank=True)
    genre = models.CharField(max_length=50, null=True, blank=True)
    social_media_links = models.JSONField(null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    is_verified = models.BooleanField(default=False) 
    is_active = models.BooleanField(default=True) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.stage_name if self.stage_name else self.email
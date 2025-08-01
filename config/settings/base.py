import os
from datetime import timedelta
from pathlib import Path

import environ

env = environ.Env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

environ.Env.read_env(os.path.join(BASE_DIR, ".envs", ".local", "django.env"))

APP_DIR = BASE_DIR / "apps"

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=["*"])

# Application definition

INSTALLED_APPS = [
    # DJANGO_CUSTOM_ADMIN
    "jazzmin",
    # DJANGO_APPS
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # THIRD_PARTY_APPS
    "rest_framework",
    "rest_framework_simplejwt",
    "django_celery_results",
    "django_celery_beat",
    "django_filters",
    # "django_cleanup",
    "django_countries",
    "djcelery_email",
    "djoser",
    "social_django",
    "cachalot",
    "corsheaders",
    "drf_spectacular",
    "colorfield",
    # LOCAL_APPS
    "apps.users",
    "apps.subscriptions",
    "apps.payments",
    "apps.artists",
    "apps.audio",
    "apps.albums",
    "apps.playlists",
    "apps.analytics",
    "apps.other",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.http.ConditionalGetMiddleware",
    "social_django.middleware.SocialAuthExceptionMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "social_django.context_processors.backends",
                "social_django.context_processors.login_redirect",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
        "ATOMIC_REQUESTS": True,
        "OPTIONS": {
            "timeout": 20,
        },
    }
}

# Password hashing
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.Argon2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher",
    "django.contrib.auth.hashers.BCryptSHA256PasswordHasher",
    "django.contrib.auth.hashers.ScryptPasswordHasher",
]

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Europe/Kiev"

USE_I18N = True

USE_TZ = True

SITE_ID = 1


DOMAIN = env("DOMAIN", default="localhost:8000")
SITE_NAME = "Avax"

# Static files (CSS, JavaScript, Images)

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/mediafiles/"
MEDIA_ROOT = BASE_DIR / "mediafiles"

# Default primary key field type

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# DEFAULT USER MODEL

AUTH_USER_MODEL = "users.User"

# CELERY
CELERY_BROKER_URL = env("CELERY_BROKER_URL", default="redis://localhost:6379/0")
CELERY_ACCEPT_CONTENT = ["application/json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_RESULT_BACKEND_MAX_RETRIES = 10
CELERY_TASK_SEND_SENT_EVENT = True
CELERY_TASK_TRACK_STARTED = True
CELERY_TASK_TIME_LIMIT = 30 * 60

if USE_TZ:
    CELERY_TIMEZONE = TIME_ZONE

# CELERY RESULT SETTINGS
CELERY_RESULT_EXTENDED = True
CELERY_RESULT_BACKEND = env("CELERY_RESULT_BACKEND", default="django-db")
CELERY_CACHE_BACKEND = env("CELERY_CACHE_BACKEND", default="django-cache")

# CELERY BEAT SETTINGS
CELERY_BEAT_SCHEDULER = "django_celery_beat.schedulers:DatabaseScheduler"

# DOC
SPECTACULAR_SETTINGS = {
    "TITLE": "Avax API",
    "DESCRIPTION": "Avax is a music streaming platform."
    " This API implements a basic set of functionalities allowing users to interact with the platform.",
    "VERSION": "0.1",
    "SERVE_INCLUDE_SCHEMA": False,
    "COMPONENT_SPLIT_REQUEST": True,
    "SCHEMA_PATH_PREFIX": r"/api/v1/",
}

# TODO: Uncomment this line to enable JWT authentication by HttpOnly Cookie
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "apps.users.authentication.CustomJWTAuthentication",
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

AUTHENTICATION_BACKENDS = (
    "social_core.backends.google.GoogleOAuth2",
    "django.contrib.auth.backends.ModelBackend",
)

SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": ("Bearer",),
    "ACCESS_TOKEN_LIFETIME": timedelta(days=10),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=14),
    "ROTATE_REFRESH_TOKENS": True,
    "SIGNING_KEY": env("SIGNING_KEY"),
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    # Custom
    "AUTH_COOKIE": "access",
    "AUTH_COOKIE_MAX_AGE": 60 * 60 * 24 * 7,
    "AUTH_COOKIE_SECURE": env.bool("AUTH_COOKIE_SECURE", default=False),
    "AUTH_COOKIE_HTTP_ONLY": True,
    "AUTH_COOKIE_PATH": "/",
    "AUTH_COOKIE_SAMESITE": "None",
}

DJOSER = {
    "LOGIN_FIELD": "email",
    "SET_USERNAME_RETYPE": True,
    "SET_PASSWORD_RETYPE": True,
    "SEND_ACTIVATION_EMAIL": True,
    "SEND_CONFORMATION_EMAIL": True,
    "LOGOUT_ON_PASSWORD_CHANGE": False,
    "USER_CREATE_PASSWORD_RETYPE": True,
    "USERNAME_CHANGED_EMAIL_CONFIRMATION": True,
    "PASSWORD_CHANGED_EMAIL_CONFIRMATION": True,
    "PASSWORD_RESET_CONFIRM_URL": "account/auth/password-reset/{uid}/{token}",
    "USERNAME_RESET_CONFIRM_URL": "account/auth/email-reset/{uid}/{token}",
    "SOCIAL_AUTH_TOKEN_STRATEGY": "djoser.social.token.jwt.TokenStrategy",
    "SOCIAL_AUTH_ALLOWED_REDIRECT_URIS": env.list(
        "SOCIAL_AUTH_ALLOWED_REDIRECT_URIS",
        default=[
            "http://localhost:3000",
        ],
    ),
    "ACTIVATION_URL": "account/auth/activate/{uid}/{token}",
    "SERIALIZERS": {
        "user_create_password_retype": "apps.users.api.serializers.CustomUserCreatePasswordRetypeSerializer",
        "user": "apps.users.api.serializers.CustomUserSerializer",
        "current_user": "apps.users.api.serializers.CustomUserSerializer",
        "user_delete": "djoser.serializers.UserDeleteSerializer",
    },
    "PERMISSIONS": {
        "user": ["apps.core.permissions.CurrentUserOrReadOnlyPermission"],
        "user_list": ["rest_framework.permissions.AllowAny"],
    },
    "EMAIL": {
        "activation": "apps.users.email.ActivationEmail",
        "confirmation": "apps.users.email.ConfirmationEmail",
        "password_reset": "apps.users.email.PasswordResetEmail",
        "password_changed_confirmation": "apps.users.email.PasswordChangedConfirmationEmail",
        "username_changed_confirmation": "apps.users.email.UsernameChangedConfirmationEmail",
        "username_reset": "apps.users.email.UsernameResetEmail",
    },
    "PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND": True,
    "USERNAME_RESET_SHOW_EMAIL_NOT_FOUND": True,
    "HIDE_USERS": False,
    "TOKEN_MODEL": None,
}

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = env("SOCIAL_AUTH_GOOGLE_OAUTH2_KEY")
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = env("SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET")
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
]
SOCIAL_AUTH_GOOGLE_OAUTH2_EXTRA_DATA = ["first_name", "last_name"]

# CACHE
CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": env("REDIS_CACHE_LOCATION", default="redis://localhost:6379/1"),
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
        },
    }
}


# CUSTOM ADMIN SECTION
JAZZMIN_SETTINGS = {
    "site_title": "Avax Admin",
    "site_header": "Avax",
    "site_brand": "Avax",
    "site_logo_classes": "img-circle",
    "welcome_sign": "Welcome to Avax Admin",
    "copyright": "Copyright by Avax",
    "show_ui_builder": True,
}

JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": True,
    "brand_small_text": False,
    "brand_colour": "navbar-success",
    "accent": "accent-teal",
    "navbar": "navbar-success navbar-dark",
    "no_navbar_border": False,
    "navbar_fixed": True,
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": True,
    "sidebar": "sidebar-dark-olive",
    "sidebar_nav_small_text": False,
    "sidebar_disable_expand": False,
    "sidebar_nav_child_indent": False,
    "sidebar_nav_compact_style": False,
    "sidebar_nav_legacy_style": False,
    "sidebar_nav_flat_style": False,
    "theme": "cyborg",
    "dark_mode_theme": "cyborg",
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-secondary",
        "info": "btn-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-success",
    },
}

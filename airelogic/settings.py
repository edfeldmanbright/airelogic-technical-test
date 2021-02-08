import os
import dj_database_url

DEBUG = os.getenv('DEBUG', False)
DEBUG_PROPAGATE_EXCEPTIONS = False
HOST_URL = os.getenv("HOST_URL", "http://127.0.0.1:8000")
PROJECT_ROOT = os.path.join(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECRET_KEY = os.getenv("SECRET_KEY")
ALLOWED_HOSTS = ["*"]
AUTH_USER_MODEL = "accounts.User"
CORS_ORIGIN_ALLOW_ALL = True
ROOT_URLCONF = "airelogic.urls"
WSGI_APPLICATION = "airelogic.wsgi.application"
SECURE_SSL_REDIRECT = not DEBUG
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

REACT_APP_STATIC_DIR = os.path.join(BASE_DIR, "react_app", "dist", "static")
STATIC_DIR = os.path.join(BASE_DIR, "static")
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
STATIC_URL = "static/"
STATICFILES_DIRS = [STATIC_DIR, REACT_APP_STATIC_DIR]


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "airelogic/../templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    'django_extensions',
    "graphene_django",
    "lyrics",
    "accounts"
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "airelogiclyrics",
        "USER": "efeldman",
        "PASSWORD": os.getenv('LOCAL_DATABASE_PASSWORD'),
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}

if not DEBUG:
    DATABASES['default'] = dj_database_url.config()


GRAPHENE = {
    'SCHEMA': 'schema.schema'
}

"""
Django settings for pencilmark project.

Generated by 'django-admin startproject' using Django 3.2.7.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import django_heroku
import sys
from datetime import timedelta
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-@dc(wm5$m860t_@_(_r=7u-_rq5s!&yun+shix=fhoml8ha$9-'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

CORS_ALLOW_CREDENTIALS = True


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'backend',
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist'
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),  
}
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=14),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('JWT',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
    'http://pencilmark.herokuapp.com'
)

CSRF_COOKIE_NAME = "csrftoken"

ROOT_URLCONF = 'pencilmark.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'pencilmark.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

if 'test' in sys.argv:
    DATABASE_URL = 'postgres://hmexuztulkckfh:3e89949dd0319bc9b0845e82bf63df7b47be27c9c34258f8738aa43fbd8dd1b5@ec2-52-203-74-38.compute-1.amazonaws.com:5432/d26dk8a2ebv0ai'
else:
    DATABASE_URL = "postgres://postgres:Rad!0head@pencilmark.chw3dhylthi3.us-east-2.rds.amazonaws.com:5432/sudoku" #os.environ['DATABASE_URL']

if 'test' in sys.argv:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'd26dk8a2ebv0ai',
            'USER': 'hmexuztulkckfh',
            'PASSWORD': '3e89949dd0319bc9b0845e82bf63df7b47be27c9c34258f8738aa43fbd8dd1b5',
            'HOST': 'ec2-52-203-74-38.compute-1.amazonaws.com',
            'PORT': 5432,
            'TEST': {
                'NAME': 'd26dk8a2ebv0ai'
            }
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'sudoku', #os.environ['DATABASE_NAME'],
            'USER': 'postgres', #os.environ['DATABASE_USER'],
            'PASSWORD': 'Rad!0head', #os.environ['DATABASE_PASSWORD'],
            'HOST': 'pencilmark.chw3dhylthi3.us-east-2.rds.amazonaws.com', #os.environ['DATABASE_HOST'],
            'PORT': 5432, #os.environ['DATABASE_PORT'],
            'TEST': {
                'NAME': 'sudoku', #os.environ['DATABASE_NAME']
            }
        # 'default': {
        #     'ENGINE': 'django.db.backends.postgresql',
        #     'NAME': os.environ.get('DATABASE_NAME'),
        #     'USER': os.environ.get('DATABASE_USER'),
        #     'PASSWORD': os.environ.get('DATABASE_PASSWORD'),
        #     'HOST': os.environ.get('DATABASE_HOST'),
        #     'PORT': '5432',
        #     'TEST': {
        #         'NAME': 'sudoku'
        #     }
        }
    }

# Custom user model
AUTH_USER_MODEL = "backend.CustomUser"


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Activate Django-Heroku.
django_heroku.settings(locals())
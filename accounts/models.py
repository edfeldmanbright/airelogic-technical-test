from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.db.models import EmailField


class InvalidPassword(Exception):
    pass


class UserManager(BaseUserManager):

    @staticmethod
    def login(password=None, request=None):
        user = User.objects.first()
        if not user.check_password(password):
            raise InvalidPassword("Incorrect passcode")
        user = authenticate(username=User.objects.first().email, password=password)
        login(request, user)
        return user


class User(AbstractBaseUser):

    email = EmailField(max_length=255, unique=True)

    USERNAME_FIELD = "email"

    @staticmethod
    def logout(request):
        logout(request)

    objects = UserManager()
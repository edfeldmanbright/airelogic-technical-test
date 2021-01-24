from graphene import Mutation, String, Boolean, ID, Field

from accounts.models import User
from lyrics.models import Artist
from lyrics.types import ArtistType


class AddArtist(Mutation):
    class Arguments:
        mbid = String(required=True)
        name = String(required=True)

    artist = Field(ArtistType)

    @staticmethod
    def mutate(root, info, **kwargs):
        return AddArtist(artist=Artist.objects.create(**kwargs))


class Login(Mutation):
    class Arguments:
        password = String(required=True)

    ok = Boolean()

    @staticmethod
    def mutate(root, info, **kwargs):
        User.objects.login(password=kwargs['password'], request=info.context)
        return Login(ok=True)


class Logout(Mutation):

    ok = Boolean()

    @staticmethod
    def mutate(root, info, **kwargs):
        User.objects.first().logout(info.context)
        return Logout(ok=True)
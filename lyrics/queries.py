from graphene import ObjectType, List, String

from lyrics.external_apis import mb_search_artist
from lyrics.models import Artist
from lyrics.types import ArtistType, BrainzResultType


class Query(ObjectType):

    artist_list = List(ArtistType)
    artist_search = List(BrainzResultType, artist=String(required=True))

    @staticmethod
    def resolve_artist_list(root, info, **kwargs):
        return Artist.objects.all()

    @staticmethod
    def resolve_artist_search(root, info, **kwargs):
        result = mb_search_artist(kwargs['artist'])
        return [BrainzResultType(**r) for r in result]

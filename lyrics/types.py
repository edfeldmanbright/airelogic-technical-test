from graphene import ObjectType, Int, Field, String, Float
from graphene_django import DjangoObjectType

from lyrics.models import Artist


class BrainzResultType(ObjectType):

    mbid = String(required=True)
    name = String(required=True)
    disambiguation = String()


class StatisticsType(ObjectType):

    song_count = Int(required=True)
    average_word_length = Float(required=True)


class ArtistType(DjangoObjectType):
    class Meta:
        model = Artist

    statistics = Field(StatisticsType)

    @staticmethod
    def resolve_statistics(root, info, **kwargs):
        return {
            "song_count": root.song_count,
            "average_word_length": root.average_word_length
        }
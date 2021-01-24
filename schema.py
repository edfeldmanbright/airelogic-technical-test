from graphene import ObjectType, Schema

from lyrics.mutations import Login, Logout, AddArtist
from lyrics.queries import Query


class Mutation(ObjectType):
    login = Login.Field()
    logout = Logout.Field()
    add_artist = AddArtist.Field()


schema = Schema(query=Query, mutation=Mutation)

from django.db import models, IntegrityError

from lyrics.external_apis import mb_artist_stats


class ArtistAlreadyExists(IntegrityError):
    pass


class ArtistManager(models.Manager):

    def create(self, mbid, name):
        if Artist.objects.filter(mbid=mbid):
            raise ArtistAlreadyExists('Artist is already in database!')
        artist_stats = mb_artist_stats(mbid, name)
        return super().create(mbid=mbid, name=name, **artist_stats)


class Artist(models.Model):
    mbid = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255)
    song_count = models.IntegerField()
    average_word_length = models.FloatField()

    objects = ArtistManager()

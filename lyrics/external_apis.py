import requests
from json.decoder import JSONDecodeError

from lyrics.analysis import perform_lyric_analysis

headers = {
    "User-Agent": "airelogic-lyrics-app",
    "Accept": "application/json"
}


def mb_search_artist(artist):
    response = requests.get(
        f'https://musicbrainz.org/ws/2/artist?query={artist}&limit=3',
        headers=headers
    )
    artists = response.json()['artists']
    return [
        {
            "name": a['name'],
            "mbid": a['id'],
            "disambiguation": a.get('disambiguation', None) or a.get('country', None)
        }
        for a in artists
    ]


def mb_artist_stats(mbid, artist_name):
    response = requests.get(
        f'https://musicbrainz.org/ws/2/artist/{mbid}?inc=releases+recording-rels',
        headers=headers
    )
    data = response.json()
    recordings = [r['recording']['title'] for r in data['relations']]
    return {
        'song_count': len(recordings),
        'average_word_length': get_lyric_analysis(recordings, artist_name)
    }


def get_lyric_analysis(recordings, artist):
    lyrics = ""
    for r in recordings[0:10]:
        try:
            response = requests.get(f'https://api.lyrics.ovh/v1/{artist}/{r}')
            lyrics += response.json()['lyrics']
        except JSONDecodeError:
            continue
    return perform_lyric_analysis(lyrics)

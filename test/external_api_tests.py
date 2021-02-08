import json
import os
from unittest.mock import patch

import pytest
from graphene.test import Client

from lyrics.external_apis import (
    mb_search_artist, mb_artist_stats, get_lyric_analysis)
from lyrics.models import Artist
from schema import schema
from test.mb_mocks import mock_mb_search_result


@pytest.mark.external
def test_mb_search_artist():
    result = mb_search_artist('Johnny Cash')
    assert result == mock_mb_search_result()


@pytest.mark.external
def test_integrated_artist_search_query():
    client = Client(schema)
    with open('react_app/src/graphql/artist-search-query.json') as file:
        query = json.load(file)
    result = client.execute(query, variable_values={"artist": "Johnny Cash"})
    assert not result.get('errors')
    assert result['data']['artistSearch'] == mock_mb_search_result()


@pytest.mark.external
def test_mb_artist_stats():
    mbid = mock_mb_search_result()[0]['mbid']
    name = mock_mb_search_result()[0]['name']
    with patch('lyrics.external_apis.get_lyric_analysis') as lyric_analysis:
        lyric_analysis.return_value = 4.9
        result = mb_artist_stats(mbid, name)
    lyric_analysis.assert_called_once()
    assert result == {
        "song_count": 686,
        "average_word_length": 4.9
    }


@pytest.mark.external
def test_get_lyric_analysis():
    with patch('lyrics.external_apis.perform_lyric_analysis') as analysis:
        analysis.return_value = 4.7
        get_lyric_analysis(['ring of fire'], 'johnny cash')
    assert "Love is a burning thing" in analysis.call_args[0][0]


@pytest.mark.external
@pytest.mark.django_db
def test_integrated_add_artist_mutation():
    os.environ['GRAPHQL_KEY'] = 'correct-key'
    client = Client(schema)
    with open('react_app/src/graphql/add-artist-mutation.json') as file:
        query = json.load(file)
    mock = mock_mb_search_result()[0]
    result = client.execute(query, variable_values={
        "mbid": mock['mbid'],
        "name": mock['name'],
        "graphqlKey": 'correct-key'
    })
    assert not result.get('errors')
    created_artist = Artist.objects.first()
    assert created_artist
    assert created_artist.song_count == 686
    assert created_artist.average_word_length == 3.76

import json
import os
from unittest.mock import Mock, patch

import pytest
from django.contrib.sessions.middleware import SessionMiddleware
from django.test import RequestFactory
from graphene.test import Client

from lyrics.models import Artist
from accounts.models import User
from schema import schema


@pytest.mark.django_db
def test_artist_list_query_integrated():
    Artist(
        mbid='abcde',
        name='',
        song_count=20,
        average_word_length=4.0
    ).save()
    client = Client(schema)
    with open('react_app/src/graphql/artist-list-query.json') as file:
        query = json.load(file)
    result = client.execute(query, variable_values={'id': '1'})
    assert not result.get('errors')
    assert result['data']['artistList'][0]['statistics'] == {
        "averageWordLength": 4.0,
        "songCount": 20
    }


@pytest.mark.django_db
def test_artist_search_query():
    client = Client(schema)
    with open('react_app/src/graphql/artist-search-query.json') as file:
        query = json.load(file)
    with patch('lyrics.queries.mb_search_artist') as search:
        result = client.execute(
            query, variable_values={"artist": "Johnny Cash"})
    assert not result.get('errors')
    search.assert_called_once()


@pytest.mark.django_db
def test_add_artist_mutation():
    os.environ['GRAPHQL_KEY'] = 'correct-key'
    client = Client(schema)
    with open('react_app/src/graphql/add-artist-mutation.json') as file:
        query = json.load(file)
    with patch('lyrics.models.Artist.objects.create') as add:
        add.return_value = Artist(
            mbid='abcde',
            name='',
            song_count=20,
            average_word_length=4.0
        )
        result = client.execute(query, variable_values={
            "mbid": "asfasf-agaeg-asgasgw-asfasg",
            "name": "Johnny Cash",
            "graphqlKey": 'correct-key'
        })
    assert not result.get('errors')
    add.assert_called_once()


@pytest.mark.django_db
def test_add_artist_mutation_cannot_be_accessed_from_url():
    client = Client(schema)
    with open('react_app/src/graphql/add-artist-mutation.json') as file:
        query = json.load(file)
    with patch('lyrics.models.Artist.objects.create') as add:
        result = client.execute(query, variable_values={
            "mbid": "asfasf-agaeg-asgasgw-asfasg",
            "name": "Johnny Cash",
            "graphqlKey": 'abc'
        })
    errors = result.get('errors')[0]['message']
    assert 'You cannot add an artist without using the UI' in errors
    add.assert_not_called()


@pytest.mark.django_db
def test_login_mutation():
    with open('react_app/src/graphql/login.json') as file:
        m = json.load(file)
    client = Client(schema)
    kwargs = {'password': 'test'}
    info = Mock()
    with patch("accounts.models.User.objects.login") as target:
        client.execute(m, variable_values=kwargs, context_value=info)
    target.assert_called_once_with(password='test', request=info)


@pytest.mark.django_db
def test_successful_login():
    request = RequestFactory().get('/')
    middleware = SessionMiddleware()
    middleware.process_request(request)
    request.session.save()
    u = User.objects.create(id=5, email='onlyuser@lyrics.com')
    u.set_password('test')
    u.save()
    user = User.objects.login(password='test', request=request)
    assert user == User.objects.get(id=5)


@pytest.mark.django_db
def test_logout_mutation():
    User.objects.create(id=5, email='onlyuser@lyrics.com')
    with open('react_app/src/graphql/logout.json') as file:
        m = json.load(file)
    client = Client(schema)
    info = Mock()
    with patch("accounts.models.User.logout") as target:
        client.execute(m, context_value=info)
    target.assert_called_once()


@pytest.mark.django_db
def test_successful_logout(client):
    u = User.objects.create(id=5, email='onlyuser@lyrics.com')
    request = RequestFactory().get('/')
    middleware = SessionMiddleware()
    middleware.process_request(request)
    request.user = u
    request.session.save()
    assert request.user.is_authenticated
    u.logout(request=request)
    assert not request.user.is_authenticated

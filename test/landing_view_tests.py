import json

import pytest
from django.test import override_settings
from pytest_django.asserts import assertTemplateUsed

from accounts.models import User


def test_landing_view_loads_correct_template(client):
    response = client.get('/')
    assert response.status_code == 200
    assertTemplateUsed(response, 'index.html')


def test_landing_view_loads_correct_template_from_any_url(client):
    response = client.get('/random-url')
    assert response.status_code == 200
    assertTemplateUsed(response, 'index.html')


@override_settings(HOST_URL='https://mock-site.com')
def test_landing_view_loads_with_host_url(client):
    response = client.get('/')
    assert response.status_code == 200
    json_response = json.loads(response.context['json_context'])
    assert json_response['HOST_URL'] == "https://mock-site.com"


@pytest.mark.django_db
def test_landing_view_loads_with_authenticated_user_flag_true(client):
    u = User.objects.create(id=5, email='onlyuser@lyrics.com')
    u.set_password('test')
    u.save()
    client.login(username='onlyuser@lyrics.com', password='test')
    response = client.get('/')
    assert response.status_code == 200
    assert json.loads(response.context['json_context'])['user']


@pytest.mark.django_db
def test_landing_view_loads_with_authenticated_user_flag_false(client):
    response = client.get('/')
    assert response.status_code == 200
    assert not json.loads(response.context['json_context'])['user']

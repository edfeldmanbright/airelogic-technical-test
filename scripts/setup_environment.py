import json
import os

from accounts.models import User
from lyrics.models import Artist


def run():
    with open('react_app/graphql-key.json', 'w+') as file:
        json.dump(os.getenv('GRAPHQL_KEY'), file)

    os.system(
        '''
        python manage.py migrate
        cd react_app
        npm install
        npm run build
        cd ..
        python manage.py collectstatic --no-input
        python sync_schema.py
        '''
    )

    u, _ = User.objects.get_or_create(email='singleuser@lyricapp.com')
    u.set_password('efb123')
    u.save()

    Artist(
        mbid='d43d12a1-2dc9-4257-a2fd-0a3bb1081b86',
        name='Johnny Cash',
        song_count=686,
        average_word_length=3.76
    ).save()

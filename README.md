# Aire Logic Technical test - Ed Feldman Bright


## Installation

Pre-requisites:
- Node 14.5.4
- npm 6.14.11
- python 3
- empty postgreSQL database named airelogiclyrics with a public schema and all permissions granted to your username

Clone the repo then run
```
python manage.py runscript setup_environment
```

## Running tests

### Backend
```
python manage.py collecstatic
pytest
```
To exclude integration tests that rely on the external APIs use the flag ```-m "not external"```


### Front end
```
cd react_app
jest
```

Any changes made to the *graphene* schema will need to be synced with the front end test schema file (*react_app/schema.graphql*) using the command
```
python sync_schema.py
```

### Integration tests

The graphQL schema is tested by both the backend (using the graphene test client) and the front end (using Apollo mocked provider)

To ensure correct integration, the queries and mutations are stored in .json format in *react_app/src/graphql* and shared between front and back end tests.


### Test Coverage

There is one area of the codebase that is not properly tested - the interactions around the *Material UI Autocomplete component*.

The component itself has no obvious API and I'd have to research its internals to work out how to invoke the onChange function.

The other option would be to mock the component entirely, but as a general principle, I prefer not to do this.

This would the next priority for the app before it went to production


## Description

- This app allows users to compare data about artists and their songs.


- When an artist is first queried, the data is retrieved from the *MusicBrainz API* and the Lyric data is retrieved from the *LyricOVH API*.


- This data is then analysed and saved on the app database.


- When an artist is queried again, the data is served from the app database, not the external APIs.


- The result is a much faster interface for the most commonly queried artists.


- To decrease wait time when first adding an artists, only lyrics from the first 10 songs are analysed for the word count average


### Additional features

- Agnostic front end will correctly display any data passed to it, increasing ease of expansion


- Login / logout linked with django auth to cache authentication on browser


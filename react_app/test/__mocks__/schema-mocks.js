import {ADD_ARTIST, LOGIN, LOGOUT} from "../../src/mutations";
import {testAgainstSchema} from "../test-utils";
import {ARTIST_LIST_QUERY, ARTIST_SEARCH_QUERY} from "../../src/queries";

export const mockArtistListResult = () => {
  return {
    data: {
      artistList: [
        {
          name: 'Led Zeppelin',
          statistics: {
            songCount: 45,
            averageWordLength: 4.2
          }
        },
        {
          name: 'Johnny Cash',
          statistics: {
            songCount: 22,
            averageWordLength: 6.7
          }
        },
        {
          name: 'Ariana Grande',
          statistics: {
            songCount: 402,
            averageWordLength: 3.4
          }
        }
      ]
    }
  };
};

const mockArtistSearchResult = () => {
  return {
    data: {
      artistSearch: [
        {
          mbid: 'abc-abc-abc-abc',
          name: 'Johnny Cash',
          disambiguation: 'Country folk legend'
        }
      ]
    }
  };
};

const mockAddArtistResult = () => {
  return {
    data: {
      addArtist: {
        artist: {
          name: 'Johnny Cash',
          statistics: {
            songCount: 686,
            averageWordLength: 3.7
          }
        }
      }
    }
  }
}

export const mockArtistListQuery = () => {
  const querySpy = jest.fn();
  const query = {
    request: {query: ARTIST_LIST_QUERY},
    result: () => {
      querySpy();
      return mockArtistListResult();
    }
  };
  testAgainstSchema(query);
  querySpy.mockClear();
  return {"mockQuery": query, "querySpy": querySpy};
};


export const mockArtistSearchQuery = () => {
  const querySpy = jest.fn();
  const query = {
    request: {query: ARTIST_SEARCH_QUERY, variables: {artist: 'Johnny Cash'}},
    result: () => {
      querySpy();
      return mockArtistSearchResult();
    }
  };
  testAgainstSchema(query);
  querySpy.mockClear();
  return {"mockQuery": query, "querySpy": querySpy};
};

export const mockAddArtistMutation = () => {
  const mutationSpy = jest.fn();
  const mutation = {
    request: {query: ADD_ARTIST, variables:
        {
          name: 'Johnny Cash',
          mbid: 'abc-abc-abc-abc',
          graphqlKey: 'correct-key'
        }},
    result: () => {
      mutationSpy();
      return mockAddArtistResult()
    }
  };
  testAgainstSchema(mutation);
  mutationSpy.mockClear();
  return {"mockMutation": mutation, "mutationSpy": mutationSpy};
};

export const mockLoginMutation = () => {
  const mutationSpy = jest.fn();
  const mutation = {
    request: {query: LOGIN, variables: {password: 'test'}},
    result: () => {
      mutationSpy();
      return {data: {login: {ok: true}}};
    }
  };
  testAgainstSchema(mutation);
  mutationSpy.mockClear();
  return {"mockMutation": mutation, "mutationSpy": mutationSpy};
};

export const mockLogoutMutation = () => {
  const mutationSpy = jest.fn();
  const mutation = {
    request: {query: LOGOUT},
    result: () => {
      mutationSpy();
      return {data: {logout: {ok: true}}};
    }
  };
  testAgainstSchema(mutation);
  mutationSpy.mockClear();
  return {"mockMutation": mutation, "mutationSpy": mutationSpy};
};
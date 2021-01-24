import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';
import {Home} from "./home";
import {getCookie} from './utils';

document.body.classList.add('background');

const createApolloClient = (cache = {}) =>
  new ApolloClient({
    ssrMode: typeof window !== 'undefined',
    cache: new InMemoryCache({addTypename: false}).restore(cache),
    link: createUploadLink(
      { uri: `${djangoContext.HOST_URL.replace(/ /g, '')}/graphql/`,
        headers: {'X-CSRFToken': getCookie('csrftoken')}
      }
    ),
  });

ReactDOM.render(
  <ApolloProvider client={createApolloClient()}>
    <Home user={djangoContext.user}/>
  </ApolloProvider>,
  document.getElementById('root')
);
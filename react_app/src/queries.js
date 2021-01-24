import gql from "graphql-tag";

export const ARTIST_LIST_QUERY = gql`${require('./graphql/artist-list-query.json')}`

export const ARTIST_SEARCH_QUERY = gql`${require('./graphql/artist-search-query.json')}`
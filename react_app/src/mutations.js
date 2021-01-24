import gql from "graphql-tag";

export const LOGIN = gql`${require('./graphql/login.json')}`;

export const LOGOUT = gql`${require('./graphql/logout.json')}`;

export const ADD_ARTIST = gql`${require('./graphql/add-artist-mutation.json')}`
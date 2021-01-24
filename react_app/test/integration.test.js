import React from 'react';
import {Home} from "../src/home";
import {createContainer} from "./test-utils";
import {Login} from "../src/login-logout";
import {
  mockAddArtistMutation,
  mockArtistListQuery, mockArtistListResult,
  mockArtistSearchQuery,
  mockLoginMutation,
  mockLogoutMutation
} from "./__mocks__/schema-mocks";
import {ArtistLoader, LyricApp} from "../src/lyric-app";


// Run "python lyrics/sync_schema.py" from root dir before testing
  // in order to sync python schema declaration with tests

describe('Schema tests', () => {

  let render, find, click, change, act, waitFor, mocks, route, keyPress, mockQuery, querySpy

  beforeEach(() => {
    ({render, find, click, act, change, waitFor, mocks, route, keyPress} = createContainer());
    ({mockQuery, querySpy} = mockArtistListQuery())
    mocks.push(mockQuery)
  });

  test('Artist list', async () => {
    await act(async () => render(<ArtistLoader/>))
    await waitFor(200)
    expect(querySpy).toHaveBeenCalledTimes(1)
    expect(find('#lyric-app')).not.toBeNull()
  });
  test('Integrated test for adding new artist', async () => {
    const artistList = mockArtistListResult().data.artistList
    const {mockMutation, mutationSpy} = mockAddArtistMutation()
    mocks.push(mockMutation)
    const {mockQuery, querySpy} = mockArtistSearchQuery()
    mocks.push(mockQuery)
    await act(async () => render(<LyricApp artistList={artistList}/>))
    expect(find('#add-artist')).not.toBeNull()
    click('#add-artist')
    expect(find('#add-artist-modal')).not.toBeNull()
    expect(find('#add-artist-input')).not.toBeNull()
    change('#add-artist-input', 'Johnny Cash')
    keyPress('#add-artist-input', 'Enter')
    await waitFor(20)
    expect(querySpy).toHaveBeenCalledTimes(1)
    expect(find('#search-results')).not.toBeNull()
    expect(find('#search-results').textContent).toContain('Johnny Cash Country folk legend')
    expect(find('#artist-0')).not.toBeNull()
    await act(async () => click('#artist-0'))
    await waitFor(1000)
    expect(mutationSpy).toHaveBeenCalledTimes(1)
  });
  test('Log in', async () => {
    const {mockMutation, mutationSpy} = mockLoginMutation()
    mocks.push(mockMutation)
    const setAuthenticatedSpy = jest.fn()
    await act(async () => render(<Login setAuthenticated={setAuthenticatedSpy}/>))
    expect(find('#password')).not.toBeNull()
    expect(find('#passcode-input')).not.toBeNull()
    change('#passcode-input', 'test')
    keyPress('#passcode-input', "Enter")
    await waitFor(20)
    expect(mutationSpy).toHaveBeenCalledTimes(1)
    expect(setAuthenticatedSpy).toHaveBeenCalledTimes(1)
  })
  test('Logout ', async () => {
    const {mockMutation, mutationSpy} = mockLogoutMutation()
    mocks.push(mockMutation)
    await act(async () => render(<Home user={true}/>))
    expect(find('#logout')).not.toBeNull()
    await act(async () => click('#logout'))
    expect(mutationSpy).toHaveBeenCalledTimes(1)
    expect(find('#passcode-input')).not.toBeNull()
    expect(find('#logout')).toBeNull()
  })
});
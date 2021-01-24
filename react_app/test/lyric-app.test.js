import React from 'react'
import {createContainer} from "./test-utils";
import {LyricApp} from "../src/lyric-app";
import {mockArtistListResult} from "./__mocks__/schema-mocks";


describe('Lyric app tests', () => {

  let render, find, click, change, act, waitFor, mocks, route, keyPress

  beforeEach(() => ({render, find, click, act, change, waitFor, mocks, route, keyPress} = createContainer()));

  test('Lyric app loads', async () => {
    const artistList = mockArtistListResult().data.artistList
    await act(async () => render(<LyricApp artistList={artistList}/>))
    expect(find('#lyric-app')).not.toBeNull()
  })
});
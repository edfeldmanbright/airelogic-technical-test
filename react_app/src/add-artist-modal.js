import React, {useEffect, useState} from 'react';
import {Card, FormHelperText, LinearProgress, Modal, TextField} from "@material-ui/core";
import {useLazyQuery, useMutation} from "@apollo/client";
import {ARTIST_SEARCH_QUERY} from "./queries";
import {ADD_ARTIST} from "./mutations";
import randomColor from 'randomcolor'
import {Conditional} from "./utils";

export const AddArtistModal = ({close, artists, setArtists, artistList, setArtistList, value}) => {

  const [error, setError] = useState("")

  const [searchQuery, {loading, data}] = useLazyQuery(ARTIST_SEARCH_QUERY)
  const [addArtistMutation, {loading: mutationLoading}] = useMutation(ADD_ARTIST)


  const addArtist = artist => {
    addArtistMutation({variables: {
      mbid: artist.mbid,
      name: artist.name,
      graphqlKey: GRAPHQL_KEY // mocked in jest globals
    }})
      .then(r => {
        const newArtist = r.data.addArtist.artist
        artists.push({...newArtist, ...{color: randomColor()}})
        setArtists([...artists])
        artistList.push(newArtist)
        setArtistList([...artistList])
        close()
      })
      .catch(e => setError(e.message))
  }

  useEffect(() => !data && searchQuery({variables: {artist: value}}))

  return (
    <Modal open={true} onClose={close}>
      <Card id='add-artist-modal' className='text-center pt-3'>

        <Conditional if={loading || mutationLoading}>
          <LinearProgress/>
          <br/>
          <div>Please be patient, the speed is outside our control!</div>
        </Conditional>

        {error && <FormHelperText className='m-auto text-center' error>{error}</FormHelperText>}

        <Conditional if={data && !loading && !mutationLoading}>
          <div id='search-results'>
            <h5 className='pt-3'>
              Did you mean?
            </h5>
            {data && data.artistSearch.map((a, k) =>
              <h6
                id={'artist-'+k}
                key={k}
                className='mt-3 font-weight-bold clickable'
                onClick={() => addArtist(a)}
              >
                {a.name} {a.disambiguation || ''}
              </h6>
            )}
          </div>
        </Conditional>
      </Card>
    </Modal>
  )
}
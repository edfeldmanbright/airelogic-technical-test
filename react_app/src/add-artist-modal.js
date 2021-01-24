import React, {useState} from 'react';
import {Card, FormHelperText, LinearProgress, Modal, TextField} from "@material-ui/core";
import {useLazyQuery, useMutation} from "@apollo/client";
import {ARTIST_SEARCH_QUERY} from "./queries";
import {ADD_ARTIST} from "./mutations";
import randomColor from 'randomcolor'
import {Conditional} from "./utils";

export const AddArtistModal = ({close, artists, setArtists}) => {

  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")

  const [searchQuery, {loading, data}] = useLazyQuery(ARTIST_SEARCH_QUERY)
  const [addArtistMutation, {loading: mutationLoading}] = useMutation(ADD_ARTIST)


  const submitSearch = event => {
    if(event.key === 'Enter') {
      searchQuery({variables: {artist: searchTerm}})
      setSearchTerm('')
    }
  }

  const addArtist = artist => {
    addArtistMutation({variables: {mbid: artist.mbid, name: artist.name}})
      .then(r => {
        artists.push({...r.data.addArtist.artist, ...{color: randomColor()}})
        setArtists([...artists])
        close()
      })
      .catch(e => setError(e.message))
  }

  return (
    <Modal open={true} onClose={close}>
      <Card id='add-artist-modal' className='text-center pt-3'>
        {loading || mutationLoading
          ? <>
              <LinearProgress/>
              <div>Please be patient, the speed is outside our control!</div>
            </>
          : <TextField
              id='add-artist-input'
              label='Artist'
              variant='outlined'
              autoFocus
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyPress={e => submitSearch(e)}
            />
        }
        {error && <FormHelperText className='m-auto text-center' error>{error}</FormHelperText>}
        <Conditional if={data && !searchTerm && !loading && !mutationLoading}>
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
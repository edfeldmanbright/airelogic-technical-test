import {Button, Card, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {StatisticsChart} from "./statistics-chart";
import {Conditional, deCamelize, deepCopy} from "./utils";
import {Autocomplete} from "@material-ui/lab";
import randomColor from 'randomcolor';
import {AddArtistModal} from "./add-artist-modal";
import {useQuery} from "@apollo/client";
import {ARTIST_LIST_QUERY} from "./queries";


export const ArtistLoader = () => {
  const {loading, error, data} = useQuery(ARTIST_LIST_QUERY)
  if (loading || error) return <></>
  const artistList = deepCopy(data.artistList)
  return <LyricApp artistListProp={artistList}/>
}


export const LyricApp = ({artistListProp}) => {

  const [artistList, setArtistList] = useState(artistListProp)
  const [artists, setArtists] = useState([])
  const [addArtistModal, setAddArtistModal] = useState('')
  const [statisticType, setStatisticType] = useState(Object.keys(artistList[0].statistics)[0])
  const colors = artists.map(() => randomColor())

  const onTagsChange = (event, values) => {
    const finalValue = values[values.length - 1]
    if (typeof finalValue == 'string') {
      setAddArtistModal(finalValue)
    }
    else {
      values.map(v => {if (!v.color) v.color = randomColor()})
      setArtists(values)
    }
  }

  return (
    <>

      <Conditional if={addArtistModal}>
        <AddArtistModal
          close={() => setAddArtistModal('')}
          value={addArtistModal}
          artists={artists}
          setArtists={setArtists}
          artistList={artistList}
          setArtistList={setArtistList}
        />
      </Conditional>

      <Card id='lyric-app' className='px-2 text-left' >
        <h1 className='py-4'>Choose an artist, or choose more than one to compare...</h1>
        <div className='pb-3'>
          <h6 className='m-auto text-center'>
            If you're artist doesn't appear in the dropdown, finish typing their name and press enter to add them
          </h6>
        </div>
        <div className='m-auto w-75 mt-2 mb-5'>
          <Autocomplete
            multiple
            id="select-artists"
            options={artistList}
            filterSelectedOptions
            getOptionLabel={(option) => option.name}
            getOptionSelected={(option, value) => option.name === value.name}
            defaultValue={[]}
            value={artists}
            onChange={onTagsChange}
            limitTags={2}
            freeSolo
            autoHighlight
            noOptionsText='No artist found - click above to add manually'
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Artists"
                placeholder={
                  artists.length && 'Add another artist...'
                  || "Start typing an artist name..."
                }
              />
            )}
          />
        </div>
        <Conditional if={artists.length}>
          <div className='d-flex justify-content-around pt-3'>
            {artists[0] && Object.keys(artists[0].statistics).map((s, k) =>
              <Button
                key={k}
                onClick={() => setStatisticType(s)}
                size='large'
                autoFocus={statisticType == s}
              >
                {deCamelize(s)}
              </Button>)}
          </div>
          <div className='w-75 m-auto pt-1'>
            <StatisticsChart artists={artists} type={statisticType} colors={colors}/>
          </div>
        </Conditional>
      </Card>
    </>
  )
}

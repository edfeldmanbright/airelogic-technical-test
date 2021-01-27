import React, {useState} from "react";
import logo from '../static/logo.png';
import {Login, Logout} from "./login-logout";
import {Conditional} from "./utils";
import {ArtistLoader} from "./lyric-app";
import {InfoCard} from "./info-card";;


export const Home = ({user}) => {
  const [authenticated, setAuthenticated] = useState(user)
  if (!authenticated) return <Login setAuthenticated={setAuthenticated}/>
  return (
    <div id='app'>
      <Conditional if={authenticated}>
        <img id='logo' src={logo}/>
        <Logout setAuthenticated={setAuthenticated}/>
      </Conditional>
      <div id='lyric-app-wrapper' className='d-flex justify-content-around'>
        <InfoCard/>
        <ArtistLoader/>
      </div>
    </div>
  )
}

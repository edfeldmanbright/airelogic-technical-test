import {Card} from "@material-ui/core";
import React from "react";

export const InfoCard = () => {
  return (
    <Card id='tech-stack' className='px-2 text-left'>
      <h1 className='py-2'>Tech Stack</h1>
      <ul id='stack-list'>
        <li>PostgreSQL database (hosted by heroku)</li>
        <li>Python / Django backend</li>
        <li>GraphQL / Graphene API</li>
        <li>Javascript / React front end</li>
        <li>Deployed with Heroku</li>
        <li>Source code
          <a target='_blank' href={"https://github.com/edfeldmanbright/airelogic-technical-test"}>
            {' '}here
          </a>
        </li>
      </ul>
      <h1 className='pt-5 pb-3'>How it works</h1>
      <ul id='stack-list'>
        <li >
          Every time a new artist is saved, that artist is added to the
          app database
        </li>
        <li>
          When that artist is requested in the future, the external APIs
          won't have to be used
        </li>
        <li >
          The app database will gradually build up a list of most
          commonly requested artists
        </li>
        <li>
          The more it's used, the quicker it gets!
        </li>
      </ul>
    </Card>
  )
}
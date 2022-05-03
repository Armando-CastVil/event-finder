import axios from 'axios';
import { request } from 'https';
import type { NextApiRequest, NextApiResponse } from 'next'
import {SMASHGG_API_URL, SMASHGG_API_KEY} from '../utility/config'

type Data = {
  name: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
        const radius = req.query.radius as string
        const coordinates=req.query.coordinates as string
        const params={radius,coordinates}
        const tournaments = await getSoCalTournaments(params)
        
        res.status(200).json(tournaments)
}
interface GetSoCalTournamentsParams
{
radius:string
coordinates:string
}


// AJAX functions
export const getSoCalTournaments = async (params: GetSoCalTournamentsParams) => {
  

    const graphql = {
        query: `query SocalTournaments($perPage: Int, $coordinates: String!, $radius: String!,$videogameId: ID!) 
    {
      tournaments(query: {
      perPage: $perPage
      filter: {
        location: {
          distanceFrom: $coordinates,
          distance: $radius	
        }
         videogameIds: [$videogameId]
         upcoming:true
      }
    }) {
      nodes {
        id
        name
        city
        url
        startAt
        images{
          url
        }
      }
    }
  }`,
        variables: {
            
            "perPage":10,
            "coordinates": params.coordinates,
            "radius": params.radius+"mi",
            "videogameId": 1386
        }
    }
    
    
    try {
        const res = await axios.post(SMASHGG_API_URL, JSON.stringify(graphql), {
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${SMASHGG_API_KEY}`
            }
        })
        return res.data;
    } catch(error) {
        console.error("failed to get tournaments", error)
        return {}
    }
  }
  
 
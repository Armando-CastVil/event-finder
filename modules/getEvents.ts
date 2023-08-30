import startGGQueryer from "../pages/api/queryStartGG";
import { SMASHGG_API_KEY } from "../utility/config";

//function for api call
export default async function getEvents(coordinates: String, radius: String) {
    console.log("get events function")
    console.log(coordinates)
    console.log(radius)
    const query = `query SocalTournaments($perPage: Int, $coordinates: String!, $radius: String!,$videogameId: ID!) 
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
  }`
    const variables = {
        "perPage": 10,
        "coordinates": coordinates,
        "radius": radius + "mi",
        "videogameId": 1386
    }
    const data = await startGGQueryer.queryStartGG(SMASHGG_API_KEY, query, variables);
    return data

}





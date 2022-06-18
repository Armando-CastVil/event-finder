import React, { useState } from "react"
import styles from '../styles/Home.module.css'
import timeConverter from "../Modules/timeConverter"
import axios from "axios"
export default function DisplayTournaments()
{
    const [tournaments, setTournaments] = useState<any>([])

    const handleSubmit = () => {
        axios.get(`/api/events`,{params:{radius:10,coordinates:"32.75801041268319, -117.06803379439596"}}).then(({data}) => {
         
          setTournaments(data.data.tournaments.nodes)
       })
     }
    
    return(
        <div>
            <button className={styles.button}  id="button" type="submit" onClick={handleSubmit} >Get Tournaments</button>

            {tournaments.map((t: any) =>{
          return <>
             
            <div key={t.id} className={styles.results} >
              <h3  >{t.name}</h3> <img src={t.images[0].url} width={100} height={100} ></img>
              <h6 >Date: {timeConverter(t.startAt)}</h6>
              <h6  id="tourneyLink"><a href={"smash.gg"+t.url} target="_blank" rel="noopener noreferrer">Link to Tournament</a> </h6>

            </div>
            <br/>
          </>
        })}
        </div>

    )
}
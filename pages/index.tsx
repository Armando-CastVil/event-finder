import { Agent } from 'http';
import Head from 'next/head'
import React, { useState } from "react";
import axios from 'axios'
import ReactDOM from 'react-dom'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import timeConverter from './Modules/timeConverter';
import Radius from './Components/Radius';
import Location from './Components/Location';



//Exports the Home function which includes the submission handler
export default function Home( ) {
  

  let coordinates:string;
  let radius:string;
  const [tournaments, setTournaments] = useState<any>([])

  const handleSubmit = () => {
     axios.get(`/api/events`,{params:{radius:radius,coordinates:coordinates}}).then(({data}) => {
      
       setTournaments(data.data.tournaments.nodes)
    })
  }
  

  return (
    
    <div className={styles.container}>
      <Head>
        <title>SSBU Tournament Finder</title>
        <link  rel="icon" href="/favicon.ico" />
      </Head>


      
      <main className={styles.main} >
        <header>
        

        <Link href="/seeder" >
          <a target="_blank">link to seeder</a>

          </Link>
          <h1 >
            
            Find Tournaments within <Radius/> miles
          </h1>
          
          <h2>your location is: <Location/></h2>
          
          
          <button className={styles.button}  id="button" type="submit" onClick={handleSubmit} >Get Tournaments</button>
       
        
        
        </header>
        
        <section className={styles.section} >
        <div><h2 id="upcoming">Upcoming Tournaments:</h2></div>
          <div className="tourneyContainer">
        
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
      </section>
        
      </main>
      
    </div>
    
  )
}
  

  
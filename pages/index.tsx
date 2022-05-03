import { Agent } from 'http';
import Head from 'next/head'
import React, { useState } from "react";
import axios from 'axios'
import ReactDOM from 'react-dom'
import styles from '../styles/Home.module.css'
import Link from 'next/link'



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
  

  //This functions converts unix timestamps to day/month/year format
  function timeConverter(UNIX_timestamp: number){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year   ;
    return time;
  }

  class Radius extends React.Component <{}, { value: string }>
  {
    handleFormSubmit:any=(event:any) =>{
      alert('radius was submitted: ' + this.state.value);
      console.log(radius)
      console.log("coords ="+coordinates)
      event.preventDefault();
      radius=this.state.value;
      console.log(radius)
      
    }
    handleChange:any=(event:any) =>
    {
      this.setState({value: event.target.value});
    }
    constructor(props:any)
    {
      super(props);
      
      this.state = {
        value:""
        
      };

      

     

      this.handleChange = this.handleChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    render() {
      return (
        <div id="radiusForm">
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Radius:
            <textarea placeholder="Enter Radius" value={this.state.value} onChange={this.handleChange} />
            
          </label>
          
          <input type="submit" value="Submit" />
        </form>
        
        </div>
      );
    }
  }
  
  class Location extends React.Component <{}, { value: string }>
  {
   
    constructor(props:any) {
      
      super(props);
      this.state = 
      {
        value:""
      };
    }

    
  
    componentDidMount() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({value: position.coords.latitude.toString()+","+position.coords.longitude.toString()});
        coordinates=position.coords.latitude.toString()+","+position.coords.longitude.toString();
        
      });
    }
  
    render() {
      
      return (
        <React.Fragment>
          {this.state.value}
          
        </React.Fragment>
          
      );
    }
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
  

  
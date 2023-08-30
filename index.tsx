import Head from 'next/head';
import React, { useState } from "react";
import styles from '../styles/Home.module.css';
import Radius from '../Components/Radius';
import timeConverter from '../modules/timeConverter';
import Location from '../Components/Location';
import getEvents from '../modules/getEvents';

export default function Home() {
  const [coordinates, setCoordinates] = useState<string>("");
  const [radius, setRadius] = useState<string>("");
  const [tournaments, setTournaments] = useState<any>([]);

  const handleSubmit = async () => {
    if (coordinates && radius) {
     getEvents(coordinates,radius).then((tourneys)=>
     {
      setTournaments(tourneys.tournaments.nodes)
     })
     
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>SSBU Tournament Finder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header>
          
          <form>
            <label>
              Your location:
              <input
                type="text"
                value={coordinates}
                onChange={(e) => setCoordinates(e.target.value)}
              />
            </label>
            <br />
            <label>
              Radius (miles):
              <input
                type="text"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
              />
            </label>
            <br />
            <button
              className={styles.button}
              id="button"
              type="button"
              onClick={handleSubmit}
            >
              Get Tournaments
            </button>
          </form>
        </header>

        <section className={styles.section}>
          <div>
            <h2 id="upcoming">Upcoming Tournaments:</h2>
          </div>
          <div className="tourneyContainer">
            {tournaments.map((t: any) => (
              <div key={t.id} className={styles.results}>
                <h3>{t.name}</h3> <img src={t.images[0].url} width={100} height={100} alt={t.name} />
                <h6>Date: {timeConverter(t.startAt)}</h6>
                <h6 id="tourneyLink">
                  <a href={"smash.gg" + t.url} target="_blank" rel="noopener noreferrer">
                    Link to Tournament
                  </a>
                </h6>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

import React from 'react'
import Hero from '../components/Hero'
import Title from '../components/core/Title'
import Tickets from '../components/Tickets'
import BandCarousel from '../components/BandCarousel'
import { EmblaOptionsType } from 'embla-carousel-react'
import useFetch from '../hooks/UseFetch';


export default function Homepage() {
  
  const {loading: loadingBands, error: bandError, data: bandData} = useFetch("http://localhost:1337/api/bands?populate=*");
  
  const OPTIONS: EmblaOptionsType = {loop:true, align: "start"}
  return (
    <>
    <Hero/>
    <section className="section section--top section--bottom">
      <div className="container">
      <Title title="Kapely" />
      {bandData &&
        <BandCarousel slides={bandData} options={OPTIONS}/>
      }
      {loadingBands &&
        <p>Loading</p>
      }
      </div>
    </section>
    <section className="section section--top" id="listky">
      <div className="container">
          <Title title="Neváhejte koupit lístky!" />
          <Tickets/>
      </div>
    </section>
    </>
  )
}

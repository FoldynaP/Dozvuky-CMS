import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import useFetch from '../hooks/UseFetch';
import { Link } from 'react-router-dom'
// Components
import Hero from '../components/Hero'
import Title from '../components/core/Title'
import Tickets from '../components/Tickets'
import Faq from '../components/Faq'
import BandCarousel from '../components/EmblaCarousel'
import EmblaCarousel from '../components/EmblaCarousel'

interface FaqData {
  	id: number,
    title: string,
    content: any
}

export default function Homepage() {
  const url = process.env.REACT_APP_STRAPI_API_URL;
  const {loading: loadingBands, error: bandError, data: bandData} = useFetch(url + "/api/bands?populate=*");
  const {loading: loadingNews, error: newsError, data: newsData} = useFetch(url + "/api/articles?populate=*");

  const { loading: loadingFaqs, error: faqsError, data: fetchFaqsData }: {
    loading: boolean;
    error: any;
    data: FaqData[] | null | undefined;
  } = useFetch(url + "/api/faqs?populate=*");
  
  // Handle the case when faqsData is null
  const faqsData: FaqData[] = fetchFaqsData || [];
  
  const OPTIONS: EmblaOptionsType = {loop:true, align: "start"}
  return (
    <>
    <Hero/>
    <section className="section section--top section--bottom">
      <div className="container">
      <Title title="Kapely" />
      {Array.isArray(bandData) &&
        <EmblaCarousel slides={bandData} options={OPTIONS}/>
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
    <section className="section section--top section--bottom" id="novinky">
      <div className="container">
          <Title title="Novinky" />
          {Array.isArray(newsData) &&
            <EmblaCarousel articles={true} slides={newsData} options={OPTIONS}/>
          }
          {loadingNews &&
            <p>Loading</p>
          }
      </div>
    </section>
    <section className="section section--bg section--bottom">
        <div className="container">
            <div className="text-block u-text-center">
                <h2>Festival plný zážitků...</h2>
                <h4>Mrkni na minulé ročníky!</h4>
                <Link to="/galerie" className="btn-glitch" role="button"><span className="btn-glitch__text">Galerie</span></Link>
            </div>
        </div>
    </section>
    <section className="section section--top" id="informace">
      <div className="container">
        <Title title="Informace"></Title>
        <div className="information">
            <div className="grid">
                <div className="grid__col">
                    <div className="information__location u-text-center">
                        <h4>Místo konání Festivalu:</h4>
                        <ul className="information__address">
                            <li>Fotbalový stadion Česká Třebová</li>
                            <li>Pod Jelenicí 597</li>
                            <li>Česká Třebová</li>
                        </ul>
                    </div>
                </div>
                <div className="grid__col">
                    <iframe src="https://frame.mapy.cz/s/camabezoho" width="100%" height="500"></iframe>
                </div>
            </div>
        </div>
      </div>
    </section>
    <section className="section section--top section--bottom">
      <div className="container">
      {faqsData.map((data: any, index: number) => (
        <Faq faqData={data} key={index} />
      ))}
      </div>
    </section>
    </>
  )
}

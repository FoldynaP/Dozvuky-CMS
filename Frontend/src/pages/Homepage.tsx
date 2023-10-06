import React from 'react'
import { EmblaOptionsType } from 'embla-carousel-react'
import useFetch from '../hooks/UseFetch';
import { Link } from 'react-router-dom'
// Components
import Hero from '../components/Hero'
import Title from '../components/core/Title'
import Tickets from '../components/Tickets'
import Faq from '../components/Faq'
import Loading from '../components/core/Loading';
import Error from '../components/core/Error';
import EmblaCarousel from '../components/EmblaCarousel'
import Parallax from '../components/core/Parallax';
import { HeroData } from '../types/HeroData';

interface FaqData {
  	id: number,
    title: string,
    content: any
}
interface BandData {
  slides: any,
}

export default function Homepage() {
  const url = process.env.REACT_APP_STRAPI_API_URL;
  const { loading: loadingBands, error: bandError, data: bandData } = useFetch("https://admin-dozvuky-leta.onrender.com/api/bands?populate=*", "homepage");
  const {loading: loadingNews, error: newsError, data: newsData} = useFetch("https://admin-dozvuky-leta.onrender.com/api/articles?populate=*", "homepage");
  const { loading: loadingHero, error: heroError, data: heroData } = useFetch("https://admin-dozvuky-leta.onrender.com" + "/api/header-section" + "?populate=*", "Hero");
  
  if (Array.isArray(newsData)) {
    newsData.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }
  const bandDataArray = Array.isArray(bandData) ? bandData as BandData[] : [];

  const { loading: loadingFaqs, error: faqsError, data: fetchFaqsData }: {
    loading: boolean;
    error: any;
    data: FaqData[] | null | undefined;
  } = useFetch("https://admin-dozvuky-leta.onrender.com" + "/api/faqs?populate=*", "homepage");
  
  // Handle the case when faqsData is null
  const faqsData: FaqData[] = fetchFaqsData || [];
  
  const OPTIONS: EmblaOptionsType = {loop:true, align: "start"}
  return (
    <>
    <Hero heroData={heroData as HeroData} error={heroError} loading={loadingHero} />
    <section className="section section-parallax">
      <Parallax />
    </section>
    {bandDataArray.length > 0 && 
    <section className="section section--top section--bottom" id="introduction">
      <div className="container">
      <Title title="Kapely" />
      {Array.isArray(bandData) &&
        <EmblaCarousel slides={bandData} options={OPTIONS}/>
      }
      {loadingBands &&
        <Loading />
      }
      {bandError && 
        <Error />
      }
      </div>
    </section>
    }
    <section className="section section--top" id="listky">
      <div className="container">
          <Tickets/>
      </div>
    </section>
    {newsData && 
    <section className="section section--top section--bottom" id="novinky">
      <div className="container">
          <Title title="Novinky" />
          {Array.isArray(newsData) &&
            <EmblaCarousel articles={true} slides={newsData} options={OPTIONS}/>
          }
          {loadingNews &&
            <Loading />
          }
          {newsError && 
            <Error />
          }
      </div>
    </section>
    }
    <section className="section section--bg section--bottom section--promo">
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
      {faqsData && 
        <div className="faqs">
          {faqsData.map((data: any, index: number) => (
            <Faq faqData={data} key={index} />
          ))}
        </div>
      }
      {loadingFaqs && 
        <Loading />
      }
      {faqsError && 
        <Error />
      }
      </div>
    </section>
    </>
  )
}

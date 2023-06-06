import React from 'react';
//methods
import useFetch from '../hooks/UseFetch';
import { useLocation } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Helmet } from 'react-helmet';

//Components
import SvgIcon from '../components/core/SvgIcon';
import MainImage from '../components/MainImage';
import Audio from '../components/Audio';
import Iframe from '../components/Iframe';
import BreadCrumbs from '../components/core/BreadCrumbs';
import Parallax from '../components/core/Parallax';
import Loading from '../components/core/Loading';
import Error from '../components/core/Error';

interface BandProps {
    id: number,
    Name: string,
    Description?: string,
    MainImage?: any,
    blogText: any,
    SEO?: any,
    mp3?: any,
    video?: string,
    instagram?: string,
    facebook?: string,
    youtube?: string,
}

export default function KapelaDetail() {
  const url = process.env.REACT_APP_STRAPI_API_URL;
  const location = useLocation();
  const { id } = location.state;
  const { loading, error, data } = useFetch<BandProps>("http://localhost:1337" + "/api/bands/" + id + "?populate=*");
  const breadcrumbs = ["kapely", data?.Name]

  return (
    <>
    {data?.SEO &&
    <Helmet>
      <title>{data?.SEO.Title}</title>
      <meta name="description" content={data?.SEO.Description} />
    </Helmet>
    }
    <section className="section section-parallax">
      <Parallax />
    </section>
    <section className="section">
      <div className="container">
        <BreadCrumbs path={breadcrumbs} />
      </div>
    </section>
    {loading && 
      <Loading />
    }
    {data && 
      <>
      <section className="section">
        <div className="container">
          <MainImage image={data?.MainImage.data.attributes.url} imageAlt={data?.MainImage.data.attributes.alternativeText} title={data?.Name} />
        </div>
      </section>
      <section className="section section--top section--bottom">
          <div className="container">
              <div className="blog">
                  <div className="blog__text">
                    {data?.blogText ? 
                      <ReactMarkdown className="rich-text">
                        {data?.blogText}
                      </ReactMarkdown>
                    :
                    <p>Text kapely pro vás připravujeme :-)</p>
                    }
                      {data?.mp3 &&
                        <div className="blog__section">
                            <h4>Ukázka z tvorby:</h4>
                            <Audio src={data.mp3.data.attributes.url}/>                   
                        </div>
                      }
                      {data?.video &&
                        <div className="blog__section">
                          <h4>Video ukázka:</h4>
                          <div className="blog__video">
                              <Iframe url={data.video}/>
                          </div>
                        </div>
                      }
                  </div>
                  {(data?.instagram || data?.facebook) &&
                  <div className="blog__social">
                      <span>Sociální sítě:</span>
                      {data?.facebook &&
                        <a target="_blank" href={data.facebook} className="blog__social-item"><SvgIcon svgName={"fb"}></SvgIcon></a>
                      }
                      {data?.instagram &&
                        <a target="_blank" href={data.instagram} className="blog__social-item"><SvgIcon svgName={"instagram"}></SvgIcon></a>
                      }
                      {data?.youtube &&
                        <a target="_blank" href={data.youtube} className="blog__social-item"><SvgIcon svgName={"yt"}></SvgIcon></a>
                      }
                  </div>
                  }
              </div>
          </div>
      </section>
      </>
    }
    {error && 
      <Error />
    }
    </>
  );
}
import React from 'react';
import useFetch from '../hooks/UseFetch';
import { useLocation } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import SvgIcon from '../components/core/SvgIcon';
import MainImage from '../components/MainImage';
import Audio from '../components/Audio';
import Iframe from '../components/Iframe';
import BreadCrumbs from '../components/core/BreadCrumbs';
import Loading from '../components/core/Loading';
import Error from '../components/core/Error';

interface BandProps {
    id: number,
    Name: string,
    Description?: string,
    Image?: any,
    blogText: any,
    mp3?: string,
    video?: string,
    instagram?: string,
    facebook?: string,
    youtube?: string,
}

export default function KapelaDetail() {
  const url = process.env.REACT_APP_STRAPI_API_URL;
  const location = useLocation();
  const { id } = location.state;
  const { loading, error, data } = useFetch<BandProps>(url + "/api/bands/" + id + "?populate=*");

  const breadcrumbs = ["kapely", data?.Name]

  return (
    <>
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
          <MainImage image={data?.Image.data.attributes.url} title={data?.Name} />
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
                            <Audio src={data.mp3}/>                   
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
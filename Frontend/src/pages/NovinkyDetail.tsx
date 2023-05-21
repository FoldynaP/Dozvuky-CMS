import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import useFetch from '../hooks/UseFetch';
import { useLocation } from 'react-router';

//Komponenty
import BreadCrumbs from '../components/core/BreadCrumbs'
import MainImage from '../components/MainImage'
import Audio from '../components/Audio';
import Iframe from '../components/Iframe';
import SvgIcon from '../components/core/SvgIcon';

interface NewsProps {
  id: number,
  Name: string,
  Detail: any,
  BlogText: any,
  video: string,
  facebook: string,
  instagram: string,
  youtube: string
}

export default function Novinky() {
  const location = useLocation();
  const { id } = location.state;
  const { loading, error, data } = useFetch<NewsProps>("http://localhost:1337/api/articles/" + id + "?populate=*");
  const breadcrumbs = [data?.Name]

  return (
    <>
    <section className="section section--top">
      <div className="container">
        <BreadCrumbs path={breadcrumbs} />
      </div>
    </section>
    <section className="section section--top">
      <div className="container">
        <MainImage image={data?.Detail.data.attributes.url} title={data?.Name} />
      </div>
    </section>
    <section className="section section--top section--bottom">
        <div className="container">
            <div className="blog">
                <div className="blog__text">
                  {data?.BlogText ? 
                    <ReactMarkdown className="rich-text">
                      {data?.BlogText}
                    </ReactMarkdown>
                  :
                  <p>Text kapely pro vás připravujeme :-)</p>
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
  )
}

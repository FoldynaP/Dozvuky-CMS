import React from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import useFetch from '../hooks/UseFetch';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet';
import FsLightbox from "fslightbox-react";

//Komponenty
import BreadCrumbs from '../components/core/BreadCrumbs'
import MainImage from '../components/MainImage'
import Iframe from '../components/Iframe';
import Image from '../components/core/Image';
import SvgIcon from '../components/core/SvgIcon';
import Loading from '../components/core/Loading';
import Error from '../components/core/Error';

interface NewsProps {
  id: number,
  Name: string,
  Detail: any,
  BlogText: any,
  Gallery: any,
  video: string,
  facebook: string,
  instagram: string,
  youtube: string
  SEO: any,
}

export default function Novinky() {
  const url = process.env.REACT_APP_STRAPI_API_URL;
  const location = useLocation();
  const { id } = location.state;
  const { loading, error, data } = useFetch<NewsProps>("https://admin-dozvuky-leta.onrender.com" + "/api/articles/" + id + "?populate=*");
  const breadcrumbs = [data?.Name]
  const imageSources: string[] = data?.Gallery?.data.map((item: any) => item.attributes.url) || [];

  //Lightbox logic
	const [lightboxController, setLightboxController] = useState({
		toggler: false,
		slide: 1
	});
    function openLightboxOnSlide(number:number) {
		setLightboxController({
			toggler: !lightboxController.toggler,
			slide: number
		});
	}

  return (
    <>
    {data?.SEO &&
      <Helmet>
        <title>{data?.SEO.Title}</title>
        <meta name="description" content={data?.SEO.Description} />
      </Helmet>
    }
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
          <MainImage image={data?.Detail.data.attributes.url} title={data?.Name} imageAlt={data?.Detail.data.attributes.alternativeText}/>
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
                    {data?.Gallery &&
                      <div className="blog__gallery">
                        <div className="grid">
                          {data.Gallery.data.map((item: any, index: number) => (
                            <div className="grid__col col-6-12@md">
                              <div className="blog__gallery-item" key={index} onClick={() => openLightboxOnSlide(index + 1)}>
                                <Image image={item.attributes.url} alt={item.attributes.alternativeText} />
                              </div>
                            </div>
                          ))}
                          <FsLightbox
                            toggler={lightboxController.toggler}
                            sources={imageSources}
                            slide={lightboxController.slide}
                          />
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
  )
}

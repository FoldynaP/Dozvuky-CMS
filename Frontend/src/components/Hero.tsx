import React, { useEffect, useState } from 'react';
//methods
import useFetch from '../hooks/UseFetch';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
//components
import Image from './core/Image';
import Button from './core/Button';

interface SlideshowType {
  data: any;
}

interface HeroProps {
  id: number;
  Title: string;
  Annotation: string;
  Slideshow: {
    data: SlideshowType[];
  };
}

export default function Hero() {
  const url = process.env.REACT_APP_STRAPI_API_URL;
  const { loading, error, data } = useFetch<HeroProps>(url + "/api/header-section" + "?populate=*");
  let SliderData = [] as SlideshowType[] | any;
  if (data) {
    SliderData = data.Slideshow.data;
  }
  if (error) {
    SliderData = [
        {
          image: '../img/illust/hero/hero1.webp',
        },
        {
          image: '../img/illust/hero/hero2.webp',
        },
        {
          image: '../img/illust/hero/hero3.webp',
        },
        {
          image: '../img/illust/hero/hero4.webp',
        },
      ];
  }
  const style = { "--slide-duration": 8 + "s" } as React.CSSProperties;

  const [activeIndex, setActiveIndex] = useState(0);

  const slideshow = useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === SliderData.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    return () => clearInterval(interval);
  }, [SliderData.length]);

  

  return (
    <>
      <div className="hero">
      {data && 
        <>
          <div className="hero__slides">
            {SliderData.map((item: any, index: number) => (
              <div
                className={`hero__img ${
                  activeIndex === index ? "is-active" : ""
                }`}
                key={index}
              >
                <Image image={url + item.attributes.url} alt={item.attributes.alternativeText} />
              </div>
            ))}
          </div>
          <div className="hero__content">
            {data && data.Title &&
            <h1 className="hero__title">{data.Title}</h1>
            }
            {data && data.Annotation &&
              <h4 className="hero__annot">
                <ReactMarkdown className="rich-text">
                  {data.Annotation}
                </ReactMarkdown>
              </h4>
            }
            <Button link="#listky" text="Vstupenky" icon="ticket" />
          </div>
          <div className="hero__timeline" style={style}></div>
          </>
        }
    {error &&
      <>
        <div className="hero__slides">
          {SliderData.map((item: any, index: number) => (
            <div
              className={`hero__img ${
                activeIndex === index ? "is-active" : ""
              }`}
              key={index}
            >
              <Image image={item.image} alt={"Úvodní fotografie festivalu dozvuky léta"} />
            </div>
          ))}
        </div>
        <div className="hero__content">
          <h1 className="hero__title">Dozvuky léta 2023</h1>
            <h4 className="hero__annot">
              01.09 / 02.09 Stadion pod Peklákem, Česká Třebová
            </h4>
          <Button link="#listky" text="Vstupenky" icon="ticket" />
        </div>
        <div className="hero__timeline" style={style}></div>
      </>
    }
    </div>
  </>
  );
}
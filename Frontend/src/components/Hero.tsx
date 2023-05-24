import React, { useEffect, useState } from 'react';
import Image from './core/Image';
import Button from './core/Button';

export default function Hero() {
  const SliderData = [
    {
      image: '../img/illust/hero/hero1.webp',
      alt: "Úvodní obrázek festivalu"
    },
    {
      image: '../img/illust/hero/hero2.webp',
      alt: "Úvodní obrázek festivalu"
    },
    {
      image: '../img/illust/hero/hero3.webp',
      alt: "Úvodní obrázek festivalu"
    },
    {
      image: '../img/illust/hero/hero4.webp',
      alt: "Úvodní obrázek festivalu"
    },
  ];

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
    <div className="hero">
      <div className="hero__slides">
        {SliderData.map((item, index) => (
          <div
            className={`hero__img ${
              activeIndex === index ? "is-active" : ""
            }`}
            key={index}
          >
            <Image image={item.image} alt={item.alt} />
          </div>
        ))}
      </div>
      <div className="hero__content">
        <h1 className="hero__title">Dozvuky Léta 2023</h1>
        <h4 className="hero__annot">
          01.09 / 02.09 Stadion pod Peklákem, Česká Třebová
        </h4>
        <Button link="#listky" text="Chci lístky" icon="ticket" />
      </div>
      <div className="hero__timeline" style={style}></div>
    </div>
  );
}
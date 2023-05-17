import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import { Link } from 'react-router-dom'
import Image from './core/Image'
import SvgIcon from './core/SvgIcon'
import {
  DotButton,
  PrevButton,
  NextButton,
} from './core/EmblaCarouselArrowsDotsButtons'

type PropType = {
  slides: any,
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, setScrollSnaps, onSelect])

  return (
    <>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container carousel-band__container">
          {slides.map((slide, index) => (
                <Link to={`/kapely/${slide.Name}`}  state={{ id: slide.id }} className="carousel-band__item embla__slide" key={index}>
                    <div className="carousel-band__img">
                        <Image image={`http://localhost:1337` + slide.Image.data.attributes.url} alt={slide.alt}/>
                    </div>
                    <div className="carousel-band__content">
                        <h4 className="carousel-band__title">{slide.Name}</h4>
                        <div className="carousel-band__more">
                            <p className="carousel-band__description">{slide.Description}</p>
                            <span className="text-link">
                                Zobrazit více
                                <SvgIcon svgName={"back"}></SvgIcon>
                            </span>
                        </div>
                    </div>
                </Link>
                ))}
          </div>
        </div>
        <div className="carousel-band__controls">
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
      </div>
      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </>
  )
}

export default EmblaCarousel

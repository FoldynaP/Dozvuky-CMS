import React from 'react'
import Image from './core/Image'

interface mainImage {
    title?: string,
    image: string,
    imageAlt?: string,
}

export default function MainImage(props:mainImage) {
  const url = process.env.REACT_APP_STRAPI_API_URL;
  return (
    <div className="main-image">
        <div className="main-image__img">
            <Image image={url + props.image} alt={props.imageAlt}></Image>
        </div>
        <div className="main-image__content">
            <h1 className="main-image__title">{ props.title }</h1>
        </div>
    </div>
  )
}

import React from 'react'
import Image from './core/Image'

interface mainImage {
    title?: string,
    image: string,
}

export default function MainImage(props:mainImage) {
  return (
    <div className="main-image">
        <div className="main-image__img">
            <Image image={`http://localhost:1337` + props.image}></Image>
        </div>
        <div className="main-image__content">
            <h1 className="main-image__title">{ props.title }</h1>
        </div>
    </div>
  )
}

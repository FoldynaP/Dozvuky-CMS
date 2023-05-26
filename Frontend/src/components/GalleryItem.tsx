import React from 'react'

//Components
import Image from './core/Image'

interface galleryData {
  galleryData: {
    id: number,
    attributes: any,
  }
}

export default function GalleryItem({galleryData}:galleryData) {
    const url = process.env.REACT_APP_STRAPI_API_URL;
  return (
    <>
      <div className="gallery-item">
        <Image image={url + galleryData.attributes.url} alt={galleryData.attributes.alternativeText}></Image>
      </div>
    </>
  )
}

import React from 'react'
import Image from './core/Image'
import SvgIcon from './core/SvgIcon'

export default function CrossRoad() {
  return (
    <a href="{{ item.link }}" className="crossroad">
        <div className="crossroad__img">
            <Image image='../img/illust/carousel-band/band1.webp' alt=''></Image>
        </div>
        <div className="crossroad__content">
            <h4 className="crossroad__title">
                Nadpisek
                <SvgIcon svgName={"back"}></SvgIcon>
            </h4>
        </div>
    </a>
  )
}

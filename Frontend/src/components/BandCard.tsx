import React from 'react'
import Image from './core/Image'
import SvgIcon from './core/SvgIcon'
import { Link } from 'react-router-dom'

export default function BandCard(props) {
    const path = props.data.Name.replace(/\s/g, "_");
  return (
    <Link to={`/Kapely/` + path} state={{ id: props.data.id}} className="carousel-band__item">
        <div className={"carousel-band__img"}>
            <Image image={`http://localhost:1337` + props.data.Image.data.attributes.url} alt={props.data.alt}/>
        </div>
        <div className="carousel-band__content">
            <h4 className="carousel-band__title">{props.data.Name}</h4>
            <div className="carousel-band__more">
                <p className="carousel-band__description">{props.data.Description}</p>
                <span className="text-link">
                    Zobrazit více
                    <SvgIcon svgName={"back"}></SvgIcon>
                </span>
            </div>
        </div>
    </Link>
  )
}

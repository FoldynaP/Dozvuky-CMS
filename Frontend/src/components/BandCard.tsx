import React from 'react'
import Image from './core/Image'
import SvgIcon from './core/SvgIcon'
import { Link } from 'react-router-dom'
import { accentTidy } from '../composable/accentTidy'

export default function BandCard(props) {
    const url = process.env.REACT_APP_STRAPI_API_URL;
    const path = accentTidy(props.data.Name);
    console.log(props.data)
  return (
    <Link to={`/kapely/` + path} state={{ id: props.data.id}} className="carousel-band__item">
        <div className={"carousel-band__img"}>
            <Image image={ url + props.data.Image.data.attributes.url} alt={props.data.Image.data.attributes.alternativeText}/>
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

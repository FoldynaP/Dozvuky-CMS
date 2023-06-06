import React from 'react'
import Image from './core/Image'
import SvgIcon from './core/SvgIcon'
import { Link } from 'react-router-dom'
import { accentTidy } from '../composable/accentTidy'

export default function BandCard(props) {
    const url = process.env.REACT_APP_STRAPI_API_URL;
    const path = accentTidy(props.data.Name);
  return (
    <Link to={`/kapely/` + path} state={{ id: props.data.id}} className="carousel-band__item">
        <div className={"carousel-band__img"}>
            {(props.data.PreviewImage.data || props.data.MainImage.data) &&
                <Image image={ props.data.PreviewImage.data ? props.data.PreviewImage.data.attributes.url : props.data.MainImage.data.attributes.url } alt={props.data.PreviewImage.data ? props.data.PreviewImage.data.attributes.alternativeText : props.data.MainImage.data.attributes.alternativeText}/>
            }
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

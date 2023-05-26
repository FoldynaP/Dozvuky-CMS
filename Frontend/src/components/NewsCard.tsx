import React from 'react'
import { Link } from 'react-router-dom'
import Image from './core/Image'
import { accentTidy } from '../composable/accentTidy'

export default function newsCard(props) {
  const url = process.env.REACT_APP_STRAPI_API_URL;
  const path = accentTidy(props.data.Name);
  return (
  <Link to={`/novinky/${path}`} state={ {id: props.data.id }} className="carousel-news__item">
    <div className="carousel-news__image">
        <Image image={url + props.data.Preview.data.attributes.url} alt={props.data.Preview.data.attributes.alternativeText}></Image>
    </div>
    <div className="carousel-news__content">
        <h4 className="carousel-news__title">{props.data.Name}</h4>
        <p className="carousel-news__text">{props.data.Description}</p>
    </div>
</Link>
  )
}

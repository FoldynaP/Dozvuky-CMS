import React from 'react'
import { Link } from 'react-router-dom'
import Image from './core/Image'

export default function ArticleCard(props) {
  return (
    <a href="{{ item.link }}" className="carousel-news__item">
    <div className="carousel-news__image">
        <Image image={`http://localhost:1337` + props.data.Preview.data.attributes.url}></Image>
    </div>
    <div className="carousel-news__content">
        <h4 className="carousel-news__title">{props.data.Name}</h4>
        <p className="carousel-news__text">{props.data.Description}</p>
    </div>
</a>
  )
}

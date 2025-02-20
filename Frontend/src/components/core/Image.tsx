import React from 'react'

interface ImageProps {
    image: string,
    alt?: string,
    loading?: any
} 

export default function Image(props:ImageProps) {
  return (
    <figure className="image">
		<picture>
			<source srcSet={props.image}/>
			<img src={props.image} alt={props.alt} loading={props.loading}/>
		</picture>
    </figure>
  )
}

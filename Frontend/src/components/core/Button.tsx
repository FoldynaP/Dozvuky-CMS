import React from 'react'
import SvgIcon from './SvgIcon'

interface buttonProps {
    text: string,
    link?: string,
    icon?: string
}

export default function Button(props:buttonProps) {
  return (
    <a href={props.link} className="btn-glitch" role="button">
        <span className="btn-glitch__text">
            {props.text}
            {props.icon &&
              <SvgIcon svgName={props.icon}/> 
            }
        </span>
    </a>

  )
}

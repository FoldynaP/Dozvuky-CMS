import React from 'react'

interface iframeProps {
    url: string,
}

export default function Iframe(props:iframeProps) {
  return (
    <div className="video">
        <iframe
        src={props.url}>
        </iframe>
    </div>
  )
}

import React from 'react'

interface titleProps {
    title?: String,
}

export default function Title(props:titleProps) {
  return (
    <div className="title">
        <h2 className="title__text">{ props.title }</h2>
    </div>
  )
}

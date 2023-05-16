import React from 'react'
import SvgIcon from './SvgIcon'

export default function LinkBack() {
  return (
    <div className="link-back">
        <a href="/" className="link-back__link">
            <SvgIcon svgName={"back"}></SvgIcon>
            Zpět
        </a>
    </div>
  )
}

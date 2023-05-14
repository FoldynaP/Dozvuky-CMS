import React from 'react'

interface svgIcon {
    svgName?: String,
}

export default function SvgIcon(props:svgIcon) {
  return (
    <span className={`icon-svg icon-svg--${props.svgName}`} aria-hidden="true">
        <svg
            className="icon-svg__svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <use
                xlinkHref={`../img/bg/icons-svg.svg#icon-${props.svgName}`}
                width="100%"
                height="100%"
                focusable="false"
            ></use>
        </svg>
    </span>
  )
}

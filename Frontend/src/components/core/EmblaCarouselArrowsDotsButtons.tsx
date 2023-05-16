import React from 'react'
import SvgIcon from './SvgIcon'

type DotButtonPropType = {
  selected: boolean
  onClick: () => void
}

export const DotButton: React.FC<DotButtonPropType> = (props) => {
  const { selected, onClick } = props

  return (
    <button
    className={`embla__dot ${selected ? "is-selected" : ""}`}
    type="button"
    onClick={onClick}
  />
  )
}

type PrevNextButtonPropType = {
  enabled: boolean
  onClick: () => void
}

export const PrevButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props

  return (
    <div
    className="embla__button embla__button--prev"
    onClick={onClick}
  >
    <button className="embla__button-inner" disabled={!enabled}>
        <SvgIcon svgName={"arrow"}></SvgIcon>
    </button>
  </div>
  )
}

export const NextButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props

  return (
    <div
    className="embla__button embla__button--next"
    onClick={onClick}
    
  >
    <button className="embla__button-inner" disabled={!enabled}>
        <SvgIcon svgName={"arrow"}></SvgIcon>
    </button>
  </div>
  )
}

import React from "react";
import SvgIcon from "./SvgIcon";

export const DotButton = ({ selected, onClick }) => (
  <button
    className={`embla__dot ${selected ? "is-selected" : ""}`}
    type="button"
    onClick={onClick}
  />
);

export const PrevButton = ({ enabled, onClick }) => (
  <div
    className="embla__button embla__button--prev"
    onClick={onClick}
  >
    <button className="embla__button-inner" disabled={!enabled}>
        <SvgIcon svgName={"arrow"}></SvgIcon>
    </button>
  </div>
);

export const NextButton = ({ enabled, onClick }) => (
  <div
    className="embla__button embla__button--next"
    onClick={onClick}
    
  >
    <button className="embla__button-inner" disabled={!enabled}>
        <SvgIcon svgName={"arrow"}></SvgIcon>
    </button>
  </div>
);
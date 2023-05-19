import React, { useEffect, useRef, useState } from 'react';
import SvgIcon from './core/SvgIcon';

interface audioProps {
    url: string,
}

export default function Audio(props:audioProps) {
  return (
    <>
      <audio>
        <source src="https://audio.jukehost.co.uk/9enxXQaZQ4OAmD1FSxbyh4o17WdoNYX4" type="audio/mp3" />
      </audio>
      <div className="audio-player" data-target-url="https://audio.jukehost.co.uk/9enxXQaZQ4OAmD1FSxbyh4o17WdoNYX4">
        <div className="timeline" >
          <div className="progress"></div>
        </div>
        <div className="controls">
          <div className="controls__inner">
            <div className="play-container">
              <div className="toggle-play play"></div>
            </div>
            <div className="time">
              <div className="current">0:00</div>
              <div className="divider">/</div>
              <div className="length"></div>
            </div>
            <div className="playing">
              <span className="playing__bar playing__bar1"></span>
              <span className="playing__bar playing__bar2"></span>
              <span className="playing__bar playing__bar3"></span>
            </div>
          </div>
          <div className="volume-container">
            <div className="volume-button">
              <div className="volume icono-volumeMedium">
                <SvgIcon svgName={'volume'} />
              </div>
            </div>
            <div className="volume-slider">
              <div className="volume-percentage"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
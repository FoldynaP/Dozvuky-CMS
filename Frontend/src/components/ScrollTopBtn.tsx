import React, { useEffect, useState } from 'react';
import SvgIcon from './core/SvgIcon';

export default function ScrollTopBtn() {
  const [isActive, setIsActive] = useState(false);

  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    const scrollFunction = () => {
      if (
        document.body.scrollTop > 1080 ||
        document.documentElement.scrollTop > 1080
      ) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    window.addEventListener('scroll', scrollFunction);

    return () => {
      window.removeEventListener('scroll', scrollFunction);
    };
  }, [topFunction]);

  const handleClick = () => {
    topFunction();
  };

  return (
    <div className={`scroll-top ${isActive ? 'is-active' : ''}`} onClick={handleClick}>
      <SvgIcon svgName="arrow" />
    </div>
  );
}
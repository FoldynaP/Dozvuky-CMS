import React, { useEffect } from 'react';

export default function Parallax() {
  useEffect(() => {
    const init = () => {
      const parallax = document.querySelector('.js-parallax-container');
      if (!parallax) return;
      let path = document.querySelector('path');
      if (!path) {
        return;
      }
      let pathLength = path.getTotalLength();

      path.style.strokeDasharray = `${pathLength} ${pathLength}`;
      path.style.strokeDashoffset = pathLength.toString();

      const handleScroll = () => {
        const scrollPercentage =
          (document.documentElement.scrollTop + document.body.scrollTop) /
          (document.documentElement.scrollHeight -
            document.documentElement.clientHeight);

        const drawLength = pathLength * scrollPercentage;
        if (path) {
            path.style.strokeDashoffset = (pathLength - drawLength).toString();
        }
      };

      document.addEventListener('scroll', handleScroll);

      return () => {
        document.removeEventListener('scroll', handleScroll);
      };
    };

    init();
  }, []);

  return (
    <div className="line-container js-parallax-container">
      <svg
        className="line"
        viewBox="0 0 206 2010"
        fill="none"
        preserveAspectRatio="xMidYMax meet"
      >
        <path
          d="M156.396 -7V704H141.687C133.946 704.774 118.464 710.503 118.464 727.224V737.287C110.723 735.997 99.8848 738.061 118.464 756.64V763.608C111.497 763.091 101.743 766.24 118.464 782.961V791.476C119.496 795.605 123.109 803.552 129.302 802.314V1043.84C117.432 1054.94 100.814 1084.25 129.302 1112.74C138.075 1120.48 161.815 1131.32 186.587 1112.74C198.973 1102.16 216.313 1073.57 186.587 1043.84V924.625H123.883C87.4988 926.431 19.0664 946.455 36.4067 1012.1C48.5347 1030.94 65.5138 1075.27 36.4067 1101.9C7.29968 1128.53 2.08725 1174.92 3.11941 1194.79C7.76414 1227.05 33.6198 1291.56 99.8848 1291.56H153.299V3111.52"
          stroke="#ffffff"
          strokeWidth="5"
        />
      </svg>
    </div>
  );
}
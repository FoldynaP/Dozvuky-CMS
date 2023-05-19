import React from 'react';
import SvgIcon from './SvgIcon';
import { Link } from 'react-router-dom';

interface BreadcrumbsProps {
  path?: Array<any>;
}

export default function BreadCrumbs(props: BreadcrumbsProps) {
  const arrayLength = props.path?.length ?? 0; // Use default value 0 if props.path is undefined or null

  return (
    <div className="breadcrumbs">
      {props.path && (
        <div className="breadcrumbs__items">
          <div className="breadcrumbs__items">
            <div className="breadcrumbs__item">
              <Link to="/">
                <SvgIcon svgName={"home"}></SvgIcon> Domů
              </Link>
            </div>
            {props.path.map((item, index) => (
              <div className="breadcrumbs__item" key={index}>
                {index < arrayLength - 1 ? (
                  <Link to={`/`+ item}>{item}</Link>
                ) : (
                  <span>{item}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
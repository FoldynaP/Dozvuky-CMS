import React from 'react';
import Image from './core/Image';
import SvgIcon from './core/SvgIcon';
import { Link } from 'react-router-dom';

interface CrossRoadProps {
  crossroadData: {
    id: number;
    Name: string;
    Description?: string;
    Image?: any;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  };
}

export default function CrossRoad({ crossroadData }: CrossRoadProps) {
  return (
    <>
      <Link to={`/kapely/${crossroadData.Name}`}  state={{ id: crossroadData.id }} className="crossroad">
        <div className="crossroad__img">
          <Image image={`http://localhost:1337` + crossroadData.Image.data.attributes.url} alt="test" />
        </div>
        <div className="crossroad__content">
          <h4 className="crossroad__title">
            {crossroadData.Name}&nbsp;
            <SvgIcon svgName={"back"} />
          </h4>
        </div>
      </Link>
    </>
  );
}
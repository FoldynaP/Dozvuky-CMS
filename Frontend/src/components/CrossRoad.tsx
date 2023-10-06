import React from 'react';
import Image from './core/Image';
import SvgIcon from './core/SvgIcon';
import { Link } from 'react-router-dom';
import { accentTidy } from '../composable/accentTidy';

interface CrossRoadProps {
  crossroadData: {
    id: number;
    Name: string;
    Description?: string;
    MainImage?: any;
    Image?: any;
    preview?: any,
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  },
  gallery?: boolean,
}


export default function CrossRoad({ crossroadData, gallery }: CrossRoadProps) {
  //const path = crossroadData.Name.replace(/\s/g, "").replaceAll(".","");
  const url = process.env.REACT_APP_STRAPI_API_URL;

  const path = accentTidy(crossroadData.Name);

  return (
    <>
      {gallery == true ? 
        <Link to={`/galerie/${path}`}  state={{ id: crossroadData.id }} className="crossroad">
          {crossroadData?.preview?.data?.attributes?.url && 
          <div className="crossroad__img">
            <Image image={crossroadData.preview.data.attributes.url} alt={crossroadData.preview.data.attributes.alternativeText} />
          </div>
          }
          <div className="crossroad__content">
            <h4 className="crossroad__title">
              {crossroadData.Name}&nbsp;
              <SvgIcon svgName={"back"} />
            </h4>
          </div>
        </Link>
        :
        <Link to={`/kapely/${path}`}  state={{ id: crossroadData.id }} className="crossroad">
          {crossroadData?.MainImage?.data?.attributes?.url && 
          <div className="crossroad__img">
            <Image image={crossroadData?.MainImage?.data?.attributes?.url} alt={crossroadData?.MainImage?.data?.attributes?.alternativeText} />
          </div>
          }
          <div className="crossroad__content">
            <h4 className="crossroad__title">
              {crossroadData.Name}&nbsp;
              <SvgIcon svgName={"back"} />
            </h4>
          </div>
        </Link>
      }
    </>
  );
}
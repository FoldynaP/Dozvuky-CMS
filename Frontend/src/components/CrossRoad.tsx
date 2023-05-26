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
                <div className="crossroad__img">
                  <Image image={url + crossroadData.preview.data.attributes.url} alt={crossroadData.preview.data.attributes.alternativeText} />
                </div>
                <div className="crossroad__content">
                  <h4 className="crossroad__title">
                    {crossroadData.Name}&nbsp;
                    <SvgIcon svgName={"back"} />
                  </h4>
                </div>
              </Link>
        :
        <Link to={`/kapely/${path}`}  state={{ id: crossroadData.id }} className="crossroad">
          <div className="crossroad__img">
            <Image image={url + crossroadData.Image.data.attributes.url} alt={crossroadData.Image.data.attributes.alternativeText} />
          </div>
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
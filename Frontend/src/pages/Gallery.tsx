import React from 'react'
import useFetch from '../hooks/UseFetch';
//Components
import Title from '../components/core/Title'
import CrossRoad from '../components/CrossRoad'
import BreadCrumbs from '../components/core/BreadCrumbs';
import Error from '../components/core/Error';
import Loading from '../components/core/Loading';

export default function Gallery() {
const url = process.env.REACT_APP_STRAPI_API_URL;
const { loading: loadingGallery, error: galleryError, data: crossroadData } = useFetch(url + "/api/galleries?populate=*");
const breadcrumbs = ["galerie"];

  return (
    <>
    <section className="section">
        <div className="container">
        <BreadCrumbs path={breadcrumbs} />
        </div>
    </section>
    <section className="section section--top section--bottom">
        <div className="container">
            <Title title="Galerie"></Title>
            {loadingGallery &&
                <Loading />
            }
            {Array.isArray(crossroadData) && (
                <div className="grid grid--center">
                {crossroadData.map((data: any, index: number) => (
                    <div className="grid__col col-6-12@sm" key={index}>
                    <CrossRoad gallery={true} crossroadData={data} />
                    </div>
                ))}
                </div>
            )}
            {galleryError &&
                <Error />
            }
        </div>
    </section>
</>
  )
}

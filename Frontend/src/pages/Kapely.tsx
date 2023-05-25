import React from 'react';
import useFetch from '../hooks/UseFetch';
import BreadCrumbs from '../components/core/BreadCrumbs';
import CrossRoad from '../components/CrossRoad';
import Title from '../components/core/Title';
import Error from '../components/core/Error';
import Loading from '../components/core/Loading';

export default function Kapely() {
  const url = process.env.REACT_APP_STRAPI_API_URL;
  const { loading: loadingBands, error: bandError, data: bandData } = useFetch(url + "/api/bands?populate=*");
  const breadcrumbs = ["kapely"];

  return (
    <>
      <section className="section">
        <div className="container">
        <BreadCrumbs path={breadcrumbs} />
        </div>
      </section>
      <section className="section section--top section--bottom">
        <div className="container">
          <Title title="Kapely"></Title>
          {loadingBands &&
            <Loading />
          }
          {Array.isArray(bandData) && (
            <div className="grid grid--center">
              {bandData.map((data: any, index: number) => (
                <div className="grid__col col-6-12@sm" key={index}>
                  <CrossRoad crossroadData={data} />
                </div>
              ))}
            </div>
          )}
          {bandError && 
            <Error />
          }
        </div>
      </section>
    </>
  );
}
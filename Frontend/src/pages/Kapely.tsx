import React from 'react';
import useFetch from '../hooks/UseFetch';
import { Helmet } from 'react-helmet';
import BreadCrumbs from '../components/core/BreadCrumbs';
import CrossRoad from '../components/CrossRoad';
import Title from '../components/core/Title';
import Error from '../components/core/Error';
import Loading from '../components/core/Loading';

export default function Kapely() {
  const url = process.env.REACT_APP_STRAPI_API_URL;
  const { loading: loadingBands, error: bandError, data: bandData } = useFetch(url + "/api/bands?populate=*");
  const breadcrumbs = ["kapely"];
  const SEO_TITLE = "Dozvuky léta - Přehled Kapel";
  const SEO_DESCRIPTION = "Na stránce přehledu kapel si můžete prohlédnout co vás na letošním ročníku festivalu čeká. Pod peklák do České Třebové dorazí mnoho známých kapel.";
  return (
    <>
      <Helmet>
        <title>{SEO_TITLE}</title>
        <meta name="description" content={SEO_DESCRIPTION} />
      </Helmet>
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
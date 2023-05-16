import React from 'react'
import useFetch from '../hooks/UseFetch';
import LinkBack from '../components/core/LinkBack'
import CrossRoad from '../components/CrossRoad'

export default function Kapely() {
  const {loading: loadingBands, error: bandError, data: bandData} = useFetch("http://localhost:1337/api/bands?populate=*");
  return (
    <>
    <section className="section">
      <div className="container">
        <LinkBack/>
      </div>
    </section>
    <section className="section section--top-lg section--bottom">
        <div className="container">
            <div className="grid grid--center">
              {/* {bandData.map((data, index) => {
                <div className="grid__col col-6-12@sm" key={index}>
                    <CrossRoad data={data} />
                </div>
              })} */}
            </div>
        </div>
    </section>
  </>
  )
}

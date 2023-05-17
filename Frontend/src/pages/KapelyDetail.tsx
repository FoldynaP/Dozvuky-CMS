import React from 'react';
import useFetch from '../hooks/UseFetch';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import LinkBack from '../components/core/LinkBack';
import MainImage from '../components/MainImage';

interface BandProps {
    id: number;
    Name: string;
    Description?: string;
    Image?: any;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
}

export default function KapelaDetail() {
  const location = useLocation();
  const { id } = location.state;
  const { loading, error, data } = useFetch<BandProps>("http://localhost:1337/api/bands/" + id + "?populate=*");
  console.log(data)

  return (
    <>
      <section className="section">
        <div className="container">
          <LinkBack />
        </div>
      </section>
      <section className="section section--top">
        <div className="container">
          <MainImage image={data?.Image.data.attributes.url} title={data?.Name} />
        </div>
    </section>
      <div>{data?.Name}</div>
    </>
  );
}
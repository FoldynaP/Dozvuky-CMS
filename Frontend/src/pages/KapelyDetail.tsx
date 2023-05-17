import React from 'react';
import useFetch from '../hooks/UseFetch';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import LinkBack from '../components/core/LinkBack';
import SvgIcon from '../components/core/SvgIcon';
import MainImage from '../components/MainImage';

interface BandProps {
    id: number;
    Name: string;
    Description?: string;
    Image?: any;
    blogText: any,
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
    <section className="section section--top section--bottom">
        <div className="container">
            <div className="blog">
                <div className="blog__text">
                    <ReactMarkdown className="blog__rich-text">
                      {data?.blogText}
                    </ReactMarkdown>
                    <div className="blog__audio-section">
                        <h4>Ukázka z tvorby:</h4>                    
                    </div>
                    <h4>Video ukázka:</h4>
                    <div className="blog__video-section">
                    </div>
                </div>
                <div className="blog__social">
                    <span>Sociální sítě:</span>
                    <a target="_blank" href="https://www.facebook.com/375mnm" className="blog__social-item"><SvgIcon svgName={"fb"}></SvgIcon></a>
                    <a target="_blank" href="https://www.instagram.com/375_m.n.m/" className="blog__social-item"><SvgIcon svgName={"instagram"}></SvgIcon></a>
                    <a target="_blank" href="https://www.youtube.com/watch?v=_4C7Zr0qL8s&ab_channel=TheAttics" className="blog__social-item"><SvgIcon svgName={"yt"}></SvgIcon></a>
                </div>
            </div>
        </div>
    </section>
    </>
  );
}
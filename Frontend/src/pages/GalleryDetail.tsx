import React, { useState } from 'react'
import { useLocation } from 'react-router'
import useFetch from '../hooks/UseFetch'
import FsLightbox from "fslightbox-react";

//Components
import BreadCrumbs from '../components/core/BreadCrumbs'
import Title from '../components/core/Title'
import GalleryItem from '../components/GalleryItem'

interface galleryItemProps {
    id: number,
    Name: string,
    images: any,
}

export default function GalleryDetail() {
    const [toggler, setToggler] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);

    const location = useLocation();
    const { id } = location.state;
    const { loading, error, data } = useFetch<galleryItemProps>("http://localhost:1337/api/galleries/" + id + "?populate=*");
    const breadcrumbs = ["galerie"]
    
  return (
    <>
    <section className="section">
        <div className="container">

        </div>
    </section>
    <section className="section section--top section--bottom">
        <div className="container">
                <div>
                    {data && data.Name &&
                        <Title title={data.Name}></Title>
                    }
                    {data && Array.isArray(data.images.data) &&  (
                    <div className="grid grid--center">
                    {data.images.data.map((data: any, index: number) => (
                        <div className="grid__col col-6-12@sm col-4-12@md col-3-12@lg" key={index} onClick={() => setGalleryIndex(index)}>
                            <GalleryItem galleryData={data}/>
                        </div>
                    ))}
                    <button onClick={() => setToggler(!toggler)}>
                        Open the lightbox.
                    </button>
                    <FsLightbox
                        toggler={toggler}
                        sources={data.images.data[galleryIndex].attributes.url}
                        key={galleryIndex}
                    />
                    </div>
                    )}
                </div>
        </div>
    </section>
    </>
  )
}

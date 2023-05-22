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
    const location = useLocation();
    const { id } = location.state;
    const url = process.env.REACT_APP_STRAPI_API_URL;
    const { loading, error, data } = useFetch<galleryItemProps>(url + "/api/galleries/" + id + "?populate=*");
    const breadcrumbs = ["Galerie", data?.Name]
    const imageSources: string[] = data?.images?.data.map((item: any) => url + item.attributes.url) || [];

    //LOGIC
	const [lightboxController, setLightboxController] = useState({
		toggler: false,
		slide: 1
	});
    function openLightboxOnSlide(number:number) {
		setLightboxController({
			toggler: !lightboxController.toggler,
			slide: number
		});
	}

  return (
    <>
    <section className="section section--top">
        <div className="container">
            <BreadCrumbs path={breadcrumbs} />
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
                        <div className="grid__col col-6-12@sm col-4-12@md col-3-12@lg" key={index} onClick={() => openLightboxOnSlide(index + 1)}>
                            <GalleryItem galleryData={data}/>
                        </div>
                    ))}
                    {/* <button onClick={() => openLightboxOnSlide(2)}>
                        Open the lightbox.
                    </button> */}
                    <FsLightbox
                        toggler={lightboxController.toggler}
                        sources={imageSources}
                        slide={lightboxController.slide}
                    />
                    </div>
                    )}
                </div>
        </div>
    </section>
    </>
  )
}

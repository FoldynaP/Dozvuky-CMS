import React from 'react'
//methods
import useFetch from '../hooks/UseFetch'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
//components
import SvgIcon from './core/SvgIcon'
import Title from './core/Title'

interface ticketSection {
    id: number,
    Title: string,
    Link: string,
    buttonText: string,
    Annotation: any,
}

export default function Tickets() {
    const url = process.env.REACT_APP_STRAPI_API_URL;
    const { loading, error, data } : {
        loading: boolean;
        error: any;
        data: ticketSection | null | undefined;
    } = useFetch(url + "/api/ticket-section?populate=*");
    console.log(data)
  return (
    <>
    {data && 
    <div className="tickets">
        {data.Title &&
            <Title title={data.Title} />
        }
        {data.Annotation &&
        <div className="tickets__title">
            <ReactMarkdown className="rich-text u-text-center">
                {data.Annotation}
            </ReactMarkdown>
        </div>
        }
        <div className="tickets__button">
            <a target="_blank" href="https://www.ticketportal.cz/" className="btn-glitch" role="button"><span className="btn-glitch__text">Koupit lístek</span></a>
        </div>
        <div className="grid">
            <div className="grid__col col-6-12@md col-4-12@lg">
                <div className="tickets__steps">
                    <h4 className="tickets__step-title">
                        1. Klikni na odkaz 
                        <SvgIcon svgName={"ticket"}></SvgIcon>
                    </h4>
                    <div className="tickets__step-content">
                        <p>Klikni na odkaz výše a dostaň se na stránku ticketportal, kde můžeš koupit lístek na festival.</p>
                    </div>
                </div>
            </div>
            <div className="grid__col col-6-12@md col-4-12@lg">
                <div className="tickets__steps">
                    <h4 className="tickets__step-title">
                        2. Platba 
                        <SvgIcon svgName={"pay"}></SvgIcon>
                    </h4>
                    <div className="tickets__step-content">
                        <p>Vyber si platbu a následně proveď úhradu. Část tvé vstupenky půjde na dobrou věc!</p>
                    </div>
                </div>
            </div>
            <div className="grid__col col-6-12@md col-4-12@lg">
                <div className="tickets__steps">
                    <h4 className="tickets__step-title">
                        3. Doraž 
                        <SvgIcon svgName={"party"}></SvgIcon>
                        </h4>
                    <div className="tickets__step-content">
                        <p>Už zbývá jenom dorazit. Budeme se těšit. Vše vypukne 1.9. Více informací <a href="#">zde.</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    }
    </>
  )
}

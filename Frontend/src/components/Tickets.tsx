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
    ButtonText: string,
    Annotation: string,
    // TicketSteps: {
    //     id: number,
    //     Title: string,
    //     description: string
    // }
    TicketSteps: any
}

const Tickets = () => {
    const url = process.env.REACT_APP_STRAPI_API_URL;
    const { loading, error, data } : {
        loading: boolean;
        error: any;
        data: ticketSection | null | undefined;
    } = useFetch("https://admin-dozvuky-leta.onrender.com" + "/api/ticket-section?populate=*", "tickets");
  return (
    <>
    {data && 
    <div className="tickets">
        {data.Title &&
            <Title title={data.Title} />
        }
        {data.Annotation &&
        <div className="tickets__title">
            <div className="tickets__rich-text">
                <ReactMarkdown className="rich-text u-text-center">
                    {data.Annotation}
                </ReactMarkdown>
            </div>
        </div>
        }
        {data.ButtonText && 
            <div className="tickets__button">
                <a target="_blank" href={data.Link ? data.Link : "#"} className="btn-glitch" role="button"><span className="btn-glitch__text">{data.ButtonText}</span></a>
            </div>
        }
        {data.TicketSteps && 
        <div className="grid">
            {data.TicketSteps.map((data: any, index: number) => (
                <div className="grid__col col-6-12@md col-4-12@lg" key={index}>
                    <div className="tickets__steps">
                        <h4 className="tickets__step-title">
                            {data.Title}
                            <SvgIcon svgName={data.Icon}></SvgIcon>
                        </h4>
                        {data.Description &&
                        <div className="tickets__step-content">
                            <p>{data.Description}</p>
                        </div>
                        }
                    </div>
                </div>
            ))}
        </div>
        }
    </div>
    }
    </>
  )
}

export default React.memo(Tickets);

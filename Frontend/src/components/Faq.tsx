import React from 'react'
import {useState, useEffect} from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

interface faqsData {
    faqData: {
        id: number,
        Title: string,
        Content: any
    }
}

const Faq: React.FC<faqsData> = ({ faqData }) =>  {
    const [faqActive, setFaqActive] = useState(false);

    const toggleFaq = () => {
        setFaqActive(current => !current);
    }

  return (
    <div className={"faq" + (faqActive ? " is-open" : "")}>
        <div className="faq__btn js-accordion-btn" onClick={toggleFaq}>
            <h4>{faqData.Title}</h4>
        </div>
        <div className="faq__content js-accordion-content">
            <div className="faq__body js-accordion-body">
            <ReactMarkdown className="rich-text">
                {faqData.Content}
            </ReactMarkdown>
            </div>
        </div>
    </div>  
    )
}

export default React.memo(Faq);

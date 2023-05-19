import React from 'react'
import {useState, useEffect} from 'react';

export default function Faq() {

    const [faqActive, setFaqActive] = useState(false);

    const toggleFaq = () => {
        setFaqActive(current => !current);
    }

  return (
<div className={"faq" + (faqActive ? " is-open" : "")}>
    <div className="faq__btn js-accordion-btn" onClick={toggleFaq}>
        <h4>Nadpis</h4>
    </div>
    <div className="faq__content js-accordion-content">
        <div className="faq__body js-accordion-body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet aspernatur repellat ab. Minima libero porro at, impedit quae accusamus recusandae.
        </div>
    </div>
</div>  )
}

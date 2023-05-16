import React from 'react'
import SvgIcon from './core/SvgIcon'

export default function Tickets() {
  return (
    <div className="tickets">
        <div className="tickets__title">
            <h4 className="u-text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium qui laborum aliquam tempora accusamus labore pariatur nesciunt atque quam praesentium assumenda</h4>
        </div>
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
  )
}

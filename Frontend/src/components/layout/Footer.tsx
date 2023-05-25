import React from 'react'
import SvgIcon from '../core/SvgIcon'
import Image from '../core/Image'
import Title from '../core/Title'

export default function Footer() {
  return (
    <footer className="footer">
        <div className="container">
            <div className="footer__contacts" id="kontakty">
                <Title title="Kontakty"></Title>
                <div className="grid">
                    <div className="grid__col col-3-12@md">
                        <div className="footer__contact-logo">
                          <Image image="../img/illust/footer/provasodnas.png" alt="fotka publika před podiem" loading="lazy"></Image>
                        </div>
                        <h4>Spolek Pro Vás od Nás:</h4>
                        <ul>
                            <li><a href="tel:+420 123 456 789">tel: +420 123 456 789</a></li>
                            <li><a href="mailto:provasodnas@domena.cz">mail: provasodnas@domena.cz</a></li>
                        </ul>
                    </div>
                    <div className="grid__col col-3-12@md">
                        <h4>Pořadatelé:</h4>
                        <span>Tomáš Kupka:</span>
                        <ul>
                            <li><a href="tel:+420 123 456 789">tel: +420 123 456 789</a></li>
                            <li><a href="mailto:email@domena.cz">mail: tomas.kupka@domena.cz</a></li>
                        </ul>
                        <span>Jiří Holý</span>
                        <ul>
                            <li><a href="tel:+420 123 456 789">tel: +420 123 456 789</a></li>
                            <li><a href="mailto:email@domena.cz">mail: jiri.holy@domena.cz</a></li>
                        </ul>
                    </div>
                    <div className="grid__col col-3-12@md">
                        <h4>Kapely a stánkový provoz:</h4>
                        <span>Tomáš Kupka:</span>
                        <ul>
                            <li><a href="tel:+420 123 456 789">tel: +420 123 456 789</a></li>
                            <li><a href="mailto:email@domena.cz">mail: tomas.kupka@domena.cz</a></li>
                        </ul>
                        <span>Jiří Holý</span>
                        <ul>
                            <li><a href="tel:+420 123 456 789">tel: +420 123 456 789</a></li>
                            <li><a href="mailto:email@domena.cz">mail: jiri.holy@domena.cz</a></li>
                        </ul>
                    </div>
                    <div className="grid__col col-3-12@md">
                        <h4 className="u-text-center">Sledujte nás na sociálních sítích:</h4>
                        <div className="footer__socials">
                            <a target="_blank" href="https://www.facebook.com/provasodnas" className="footer__social-link">
                            <SvgIcon svgName="fb"></SvgIcon>
                            </a>
                            <a target="_blank" href="https://www.instagram.com/dozvuky_leta/" className="footer__social-link">
                            <SvgIcon svgName="instagram"></SvgIcon>
                            </a>
                            <a target="_blank" href="#" className="footer__social-link">
                            <SvgIcon svgName="twitter"></SvgIcon>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__sponsors">
                <div className="footer__sponsor-item">
                    
                </div>
            </div>
            <div className="footer__copyright">Pro Vás od Nás 2023</div>
        </div>
    </footer>
  )
}

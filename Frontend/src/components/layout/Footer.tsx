import React from 'react'
//methods
import useFetch from '../../hooks/UseFetch'
//components
import SvgIcon from '../core/SvgIcon'
import Image from '../core/Image'
import Title from '../core/Title'

interface SponsorsType {
    id: number,
    Name: string,
    Logo: any,
}

interface ContactType {
    id: number,
    Contact?: string,
    Email: string,
    Name: string,
    Phone: string,
}

interface FooterSection {
    id: number,
    Contact?: ContactType[]
}

export default function Footer() {
    const url = process.env.REACT_APP_STRAPI_API_URL;
    const { loading: loadingContact, error: errorContact, data: contactData } = useFetch<FooterSection>(url + "/api/footer-section?populate=*");
    const { loading, error, data } = useFetch<SponsorsType>(url + "/api/sponsors?populate=*");

  return (
    <footer className="footer">
        <div className="container">
            <div className="footer__contacts" id="kontakty">
                <Title title="Kontakty"></Title>
                {contactData &&
                    <div className="grid grid--center">
                        {contactData.Contact?.map((data: any, index: number) => (
                            <div className="grid__col col-3-12@md" key={index}>
                                <div className="footer__contact">
                                    <h4>{data.Name}</h4>
                                    {data.Contact && 
                                        <span className="footer__contact-name">{data.Contact}</span>
                                    }
                                    <ul>
                                        <li><a href={"tel:" + data.Phone}>tel: {data.Phone}</a></li>
                                        <li><a href={"mailto:" + data.Email}>mail: {data.Email}</a></li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                }
                <div className="footer__social">
                    <div className="grid">
                        <div className="grid__col col-4-12@md">
                            <div className="footer__logo footer__logo--left">
                                <Image image='../img/illust/logo.png' alt="Logo spolku pro vás od nás"></Image>
                            </div>
                        </div>
                        <div className="grid__col col-4-12@md">
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
                        <div className="grid__col col-4-12@md">
                            <div className="footer__logo">
                                <Image image='../img/illust/logo-test.png' alt="Logo festivalu dozvuky léta"></Image>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Title title="Sponzoři" />
            {Array.isArray(data) && (
            <div className="footer__sponsors">
                {data.map((data: any, index: number) => (
                    <div className="footer__sponsor-item" key={index}>
                        <div className="footer__sponsor-image">
                            <Image image={url + data.Logo.data.attributes.url} alt={data.Logo.data.attributes.alternativeText}></Image>
                        </div>
                    </div>
                ))}
            </div>
            )}
            <div className="footer__copyright">&copy; Pro Vás od Nás 2023</div>
        </div>
    </footer>
  )
}

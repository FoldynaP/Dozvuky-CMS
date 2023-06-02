import React from 'react'
import {useState} from 'react';
import Image from '../core/Image'
import SvgIcon from '../core/SvgIcon';
import { Link } from 'react-router-dom';

export default function Navbar() {

  const [menuActive, setMenuActive] = useState(false);

  const handleClick = event => {
    // 👇️ toggle isActive state on click
    setMenuActive(current => !current);
  };
  return (
    <header className="header">
      <nav className="header__wrap">
        <div className="header__logo">
        <Link to="/">
          <Image image="../assets/img/illust/logo-test.png" alt="Logo" />
        </Link>
        </div>
        <div className="header__list-wrap">
          <ul className={"header__list " + (menuActive && "is-open")}>
            <a href="/" className="header__home" onClick={handleClick}>
              <SvgIcon svgName="home"/>
            </a>
            <li className="header__item" onClick={handleClick}>
            <Link className='header__link' to="/kapely">
            Kapely
            </Link>
            </li>
            <li onClick={handleClick} className="header__item js-menu-link"><a href="/#listky" className="header__link">Vstupenky</a></li>
            <li onClick={handleClick} className="header__item js-menu-link"><a href="/#novinky" className="header__link">Novinky</a></li>
            <li onClick={handleClick} className="header__item js-menu-link"><Link to="/galerie" className="header__link">Galerie</Link></li>
            <li onClick={handleClick} className="header__item js-menu-link"><a href="#informace" className="header__link">Informace</a></li>
            <li onClick={handleClick} className="header__item js-menu-link"><a href="#kontakty" className="header__link">Kontakty</a></li>
          </ul>
        </div>
        <button onClick={handleClick} type="button" className={"header__toggle " + (menuActive && "menu-open")} aria-label="Menu ">
          <span className="header__toggle-ico">
            <span></span><span></span><span></span>
          </span>
        </button>
      </nav>
    </header>
  )
}

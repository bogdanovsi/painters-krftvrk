import React from 'react';

import logo from '@images/logo.png';
import styles from './header.module.scss';

interface IProps { }
const Header = (props: IProps) => {
    return (
        <header role="banner" className="header">
        <nav className="header__top">
          <div className="container">
            <div className="logo-container">
              <a href="/" title="Home" className="header-logo">
                <img src={logo} alt="logo" width={100} height={100} />
              </a>
            </div>
            <h1 className="header__find-painter">Tekijäpankki</h1>
          </div>
        </nav>
        <nav className="header__bottom">
          <div className="container menu-content">
            <ul className="header-menu">
              <li className="header-menu__item">
                <a href="/" className="header-menu__link">h</a>
              </li>
              <li className="header-menu__item"><a href="/painters" className="header-menu__link">Tekijät</a></li>
              <li className="header-menu__item"><a href="/about" className="header-menu__link">Tietoa palvelusta</a></li>
            </ul>
            <button className="header__button btn btn_colored">Pyydä tarjous</button>
          </div>
        </nav>
      </header>
    );
}

export default React.memo(Header);
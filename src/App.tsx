import React, { useEffect, useState } from 'react';
import './App.scss';

import logo from './images/logo.png';

const App = () => {
  return (<>
    <div className="App">
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
      {/* <main role="main" className="page">
        <div ng-controller="FindPainterCtrl as vm" className="ng-scope">
          <section role="region" className="search-panel">
            <section role="region" className="search-panel__top">
              <div className="container">
              </div>
            </section>
            <section role="region" className="search-panel__bottom">
              <div className="container">
              </div>
              <div className="search-panel__description">
                <p className="container">Etsi projektiisi sopivia urakoitsijoita ja pyydä tarjous!</p>
              </div>
            </section>
          </section>
          <div style={{ position: 'relative' }}>
          </div>
          <section infinite-scroll="vm.loadPainters()" infinite-scroll-distance="0" infinite-scroll-disabled='vm.serviceIsBusy || vm.noMoreElements || vm.isInError' role="region" className="container is-loading__element">
            <section ng-if="vm.painters" ng-repeat="painter in vm.painters track by painter.ID" className="painter-short">
              <div className="painter-short__logo">
                <img src="data:image/png;base64,{{painter.Logo}}" alt="{{painter.Name}}" className="painter-short__logo-img" />
              </div>
              <article className="painter-short__info">
                <h2 className="painter-short__name"><a href="/company/{{painter.EncodedName}}"></a></h2>
                <p className="painter-short__location">


                </p>
                <p className="painter-short__phone">
                  <a href="tel:{{painter.PhoneNumber}}"></a>
                </p>
                <p className="painter-short__mail">
                  <a href="mailto:{{painter.Email}}"></a>
                </p>
                <p className="painter-short__description"></p>
                <ul className="painter-short__labels tag-list">
                  <li ng-repeat="certificate in painter.Certificates" className="tag-list__tag"></li>
                </ul>
              </article>
              <div className="painter-short__actions">
                <ul className="painter-short painter-icons\">
                  <li title="Projektien määrä" className="painter-icons__item">
                    <strong className="painter-icons__text"></strong>
                  </li>
                </ul>
              </div>
            </section>
            <section ng-cloak="ng-cloak" ng-show="vm.serviceIsBusy && !vm.isInError" style={{ width: '100%', padding: '20px 0', textAlign: 'center' }}>
              <i className="spinner spinner--large"></i>
            </section>
          </section>
        </div >
      </main > */}
      <footer role="contentinfo" className="footer">
        <div className="container">
          <div className="footer__content">
            <article className="footer__article">
              <h2 className="footer__header">Löydä lähin luotettava tekijä!</h2>
              <p className="footer__text">Tekijäpankista löydät osaavat ja luotettavat tekijät maalaustyöllesi.</p><a href="/about" className="link footer__link footer__link--more">Lue lisää</a>
            </article>
            <ul className="footer__list footer__list--wide">
              <li className="footer__list-item">
                <h2 className="footer__header">Yleistä</h2>
              </li>
              <li className="footer__list-item"><a href="/about" className="link footer__link">Tietoa palvelusta</a></li>
              <li className="footer__list-item"><a href="/about/contact" className="link footer__link">Ota yhteyttä</a></li>
            </ul> 
          </div>
          <small className="footer-copy">© 2019 Tikkurila Oyj - <a href="https://www.tikkurila.fi" className="link footer-copy__link">www.tikkurila.fi</a></small>
        </div>
      </footer>
    </div >
  </>
  );
}

export default App;

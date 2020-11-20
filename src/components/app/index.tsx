import React, { useEffect, useState } from 'react';
import './App.scss';

import Header from '../Header';
import Footer from '../Footer';

const App = () => {
  return (<>
    <div className="App">
      <Header />
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
      <Footer />
    </div >
  </>
  );
}

export default App;

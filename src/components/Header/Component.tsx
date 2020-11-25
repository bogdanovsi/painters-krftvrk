import React from 'react';

import {
  HomeOutlined
} from '@ant-design/icons';

import logo from '@images/logo.png';
import './header.scss';
import { IGlobalState } from 'reducers';
import { connect } from 'react-redux';
import { IPaintersState } from '@components/Pages/Painters/reducer';

interface IProps { choosePhotosId?: Array<string> }
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
              <a href="/" className="header-menu__link">
                <HomeOutlined />
              </a>
            </li>
            <li className="header-menu__item"><a href="/painters" className="header-menu__link">Tekijät</a></li>
            <li className="header-menu__item"><a href="/about" className="header-menu__link">Tietoa palvelusta</a></li>
          </ul>
          <div className="header__button-container">
            <button className={`header__button btn_transparent ${props.choosePhotosId && props.choosePhotosId.length && 'header__button_choosed'}`}>Pyydä tarjous<span>{props.choosePhotosId && props.choosePhotosId.length}</span></button>
          </div>
        </div>
        <div className="menu-content__mobile">
          <input
            type='checkbox'
            className='burger__checkbox'
            id={"burger-menu-inp"}
          />

          <label
            className='burger'
            htmlFor={"burger-menu-inp"}
          >
            <div className='burger__line' />
            <div className='burger__line' />
            <div className='burger__line' />
          </label>
          <div
            className='burger__menu'
          >
            <ul className="header-menu">
              <li className="header-menu__item">
                <a href="/" className="header-menu__link">
                  <HomeOutlined />
                </a>
              </li>
              <li className="header-menu__item"><a href="/painters" className="header-menu__link">Tekijät</a></li>
              <li className="header-menu__item"><a href="/about" className="header-menu__link">Tietoa palvelusta</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default connect((state: IGlobalState) => ({
  ...state.painters
}))(React.memo(Header));
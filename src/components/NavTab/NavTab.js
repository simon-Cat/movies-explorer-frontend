import './NavTab.css';
import { navLinks } from '../../utils/data';
import { useState } from 'react';

const NavTab = ({ externalClass, isSignin=false }) => {
  // switch gamburger menu
  const [ isGamburgerMenuOpen, setIsGamburgerMenuOpen ] = useState(false);

  // gamburger menu switch handler
  const switchGambugerMenuHandler = () => {
    setIsGamburgerMenuOpen(!isGamburgerMenuOpen);
  };


  return (
    <>
      { isSignin ? (
        <nav className='navigation-container navigation-container_type_authorized'>
          <div onClick={switchGambugerMenuHandler} className={`navigation-container__gamburger-menu ${isGamburgerMenuOpen ? 'navigation-container__gamburger-menu_state_open' : 'navigation-container__gamburger-menu_state_close'}`}>
            <div className='navigation-container__gamburger-menu-item'></div>
            <div className='navigation-container__gamburger-menu-item'></div>
            <div className='navigation-container__gamburger-menu-item'></div>
          </div>
          <ul className='navigation-container__pages-links'>
            {navLinks.map((item, index) => (
              <li key={index}>
                <a className='navigation-container__pages-link' href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
          <a className='navigation-container__profile-link' href='#'>
            <span className='navigation-container__profile-icon' />
            Аккаунт
          </a>
        </nav>
      ) : (
        <nav className='navigation-container'>
          <ul className='navigation-container__links'>
            <li>
              <a className='navigation-container__link' href='#'>Регистрация</a>
            </li>
            <li>
              <a className='navigation-container__link navigation-container__link_type_signup' href='#'>Войти</a>
            </li>
          </ul>
        </nav>
      ) }
    </>
  );
};

export default NavTab;

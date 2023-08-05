import './Header.css';
import logo from '../../images/icons/logo-min.svg';
import { Gamburger, NavTab, Navigation } from '../';
import { useState } from 'react';

const Header = ({ externalClass, location, switchPopupStateHandler, isSignin=true }) => {
  // nav tab state
  const [ isNavigationOpen, setIsNavigationOpen ] = useState(false);
  // gamburger menu switch handler
  const handleSwitchStateNavigation = () => {
    switchPopupStateHandler();
    setIsNavigationOpen(!isNavigationOpen);
  };

  return(
    <header className={`header-container ${externalClass} ${location.pathname === '/' ? 'header-container_bgcolor_pink' : 'header-container_bgcolor_white'}`}>
      <a href='#' className='header-container__logo-link'>
        <img src={logo} alt='Logo' className='header-container__logo-image' />
      </a>
      <Gamburger changeGamburgerStateHandler={handleSwitchStateNavigation}  externalClass={`header-container__gamburger-menu`}/>
      <NavTab externalClass={`header-container__navigation`} />
      <Navigation closeNavigationHandler={handleSwitchStateNavigation} externalClass={`header__navigation-container ${ isNavigationOpen ? 'header__navigation-container_showed' : 'header__navigation-container_hidden' }`} />
    </header>
  );
};

export default Header;
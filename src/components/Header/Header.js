import './Header.css';
import logo from '../../images/icons/logo-min.svg';
import { Button, NavTab } from '../';

const Header = ({ externalClass, isSignin=true }) => {
  return(
    <header className={`header-container ${externalClass}`}>
      <a href='#' className='header-container__logo-link'>
        <img src={logo} alt='Logo' className='header-container__logo-image' />
      </a>
      <NavTab />
    </header>
  );
};

export default Header;
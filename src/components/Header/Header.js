import './Header.css';
import logo from '../../images/icons/logo-min.svg';
import { Button } from '../';

const Header = ({ externalClass }) => {
  return(
    <header className={`header-container ${externalClass}`}>
      <a href='#' className='header-container__logo-link'>
        <img src={logo} alt='Logo' className='header-container__logo-image' />
      </a>
      <div className='header-container__buttons'>
        <Button text='Регистрация' externalClass='header-container__button' />
        <Button text='Войти' externalClass='header-container__button header-container__button_fill_dark' />
      </div>
    </header>
  );
};

export default Header;
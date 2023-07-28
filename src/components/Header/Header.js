import './Header.css';
import logo from '../../images/icons/logo-min.svg';
import { Button } from '../';

const Header = () => {
  return(
    <header className='header__container'>
      <a href='#' className='header__logo-link'>
        <img src={logo} alt='Logo' className='header__logo-image' />
      </a>
      <div className='header__buttons'>
        <Button text='Регистрация' externalClass='header__button' />
        <Button text='Войти' externalClass='header__button header__button_fill_dark' />
      </div>
    </header>
  );
};

export default Header;
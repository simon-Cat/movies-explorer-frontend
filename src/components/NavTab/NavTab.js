import './NavTab.css';
import { navLinks } from '../../utils/data';

const NavTab = ({ externalClass, isSignin=true }) => {
  return (
    <>
      { isSignin ? (
        <nav className='navigation-container navigation-container_type_authorized'>
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

import './NavTab.css';
import { Link, NavLink } from 'react-router-dom';
import { navLinks } from '../../utils/data';

const NavTab = ({ externalClass, isSignin=true }) => {

  return (
    <>
      { isSignin ? (
        <nav className={`nav-tab-container nav-tab-container_type_authorized ${externalClass}`}>
          <ul className='nav-tab-container__pages-links'>
            {navLinks.map((item, index) => (
              <li key={index}>
                <NavLink className={({ isActive }) => `${ isActive ? 'nav-tab-container__pages-link nav-tab-container__pages-link_state_active' : 'nav-tab-container__pages-link' }`} to={item.url}>{item.title}</NavLink>
              </li>
            ))}
          </ul>
          <Link className='nav-tab-container__profile-link' to='/profile'>
            <span className='nav-tab-container__profile-icon' />
            Аккаунт
          </Link>
        </nav>
      ) : (
        <nav className='nav-tab-container'>
          <ul className='nav-tab-container__links'>
            <li>
              <Link className='nav-tab-container__link' to='/signup'>Регистрация</Link>
            </li>
            <li>
              <Link className='nav-tab-container__link nav-tab-container__link_type_signup' to='signin'>Войти</Link>
            </li>
          </ul>
        </nav>
      ) }
    </>
  );
};

export default NavTab;

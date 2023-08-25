import './Navigation.css';
import { Link, NavLink } from 'react-router-dom';
import { NAVIGATION_LINKS } from '../../utils/data';

const Navigation = ({ externalClass, closeNavigationHandler }) => {
  const handleCloseNavigation = () => {
    closeNavigationHandler();
  };

  return (
    <nav className={`navigation-container ${externalClass}`}>
      <ul className='navigation-container__links'>
        {NAVIGATION_LINKS.map((navigationLink, index) => (
          <li key={index} className='navigation-container__link-item'>
            <NavLink
              to={navigationLink.url}
              className={({ isActive }) =>
                isActive
                  ? 'navigation-container__link navigation-container__link_state_active'
                  : 'navigation-container__link'
              }
            >
              {navigationLink.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <Link className='navigation-container__profile-link' to='/profile'>
        <span className='navigation-container__profile-icon' />
        Аккаунт
      </Link>
      <button
        onClick={handleCloseNavigation}
        className='navigation-container__close-button'
      />
    </nav>
  );
};

export default Navigation;

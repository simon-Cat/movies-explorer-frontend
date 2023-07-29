import './Footer.css';
import { links } from '../../utils/data'

const Footer = ({ externalClass }) => {
  return (
    <footer className={`footer-container ${externalClass}`}>
      <p className='footer-container__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer-container__about'>
        <span className='footer-container__copyright'>&#169; 2023</span>
        <ul className='footer-container__links'>
          {links.map((link, index) => (
            <li key={index} className='footer-container__link'>
              <a href={link.url}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
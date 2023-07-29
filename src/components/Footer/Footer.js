import './Footer.css';

const links = [
  {
    title: 'Яндекс.Практикум',
    url: 'https://practicum.yandex.ru/',
  },
  {
    title: 'Github',
    url: 'https://github.com/simon-Cat'
  }
];

const Footer = () => {
  return (
    <footer className='footer-container'>
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
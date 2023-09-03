import './Portfolio.css';
import { PORTFOLIO } from '../../utils/data';

const Portfolio = () => {
  return (
    <section className='portfolio-container'>
      <h3 className='portfolio-container__title'>Портфолио</h3>
      <ul className='portfolio-container__list'>
        {PORTFOLIO.map((item, index) => (
          <li key={index} className='portfolio-container__item'>
            <a
              className='portfolio-container__link'
              href={item.url}
              target='_blank'
              rel='noreferrer'
            >
              <span className='portfolio-container__item-title'>
                {item.title}
              </span>
              <span className='portfolio-container__item-icon' />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Portfolio;

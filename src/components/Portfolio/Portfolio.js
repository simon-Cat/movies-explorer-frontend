import './Portfolio.css';
import { portfolio } from '../../utils/data'

const Portfolio = () => {
  return (
    <section className='portfolio-container'>
      <h3 className='portfolio-container__title'>Портфолио</h3>
      <ul className='portfolio-container__list'>
        {portfolio.map((item, index) => (
          <a key={index} href={item.url} target='_blank' rel="noreferrer">
            <li className='portfolio-container__item'>
              <span className='portfolio-container__item-title'>{item.title}</span>
              <span className='portfolio-container__item-icon' />
            </li>
          </a>
        ))}
      </ul>
    </section>
  );
};

export default Portfolio;
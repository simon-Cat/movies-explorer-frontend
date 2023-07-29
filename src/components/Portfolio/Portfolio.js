import './Portfolio.css';
import { portfolio } from '../../utils/data'

const Portfolio = () => {
  return (
    <section className='portfolio-container'>
      <h3 className='portfolio-container__title'>Портфолио</h3>
      <ul className='portfolio-container__list'>
        {portfolio.map((item, index) => (
          <li key={index} className='portfolio-container__item'>
            <span className='portfolio-container__item-title'>{item.title}</span>
            <a className='portfolio-container__item-url' href={item.url} target='_blank' rel="noreferrer" />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Portfolio;
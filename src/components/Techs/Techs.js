import './Techs.css';
import { technologies } from '../../utils/data'

const Techs = () => {
  return (
    <section className='techs-container'>
      <h2 className='techs-container__title'>Технологии</h2>
      <section className='techs-container__content'>
        <h3 className='techs-container__subtitle'>7 технологий</h3>
        <p className='techs-container__description'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className='techs-container__tech-list'>
          {technologies.map((item, index) => (
            <li key={index} className='techs-container__tech-item'>{item}</li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Techs;
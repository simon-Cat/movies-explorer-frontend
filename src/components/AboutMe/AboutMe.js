import './AboutMe.css';
import studentImage from '../../images/student.jpg';
import { Portfolio } from '../';

const AboutMe = () => {
  return (
    <section className='about-me-container'>
      <h2 className='about-me-container__title'>Студент</h2>
      <section className='about-me-container__content'>
        <div className='about-me-container__student-info'>
          <p className='about-me-container__name'>Бекир</p>
          <p className='about-me-container__my-post'>Веб-разработчик, 32 года</p>
          <p className='about-me-container__about-me'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a href='#' className='about-me-container__github-link'>Github</a>
        </div>
        <div className='about-me-container__image-container'>
          <img className='about-me-container__image' src={studentImage} alt='Student' />
        </div>
      </section>
      <Portfolio />
    </section>
  );
};

export default AboutMe;
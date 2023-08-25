import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className='about-project-container' id='about-project'>
      <h2 className='about-project-container__title'>О проекте</h2>
      <section className='about-project-container__steps'>
        <article className='about-project-container__step'>
          <h3 className='about-project-container__subtitle'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project-container__description'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </article>
        <article className='about-project-container__step'>
          <h3 className='about-project-container__subtitle'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project-container__description'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </article>
      </section>
      <div className='about-project-container__description-lines'>
        <div>
          <div className='about-project-container__description-line about-project-container__description-line__fill_dark'>
            1 неделя
          </div>
          <div className='about-project-container__subtext'>Back-end</div>
        </div>
        <div>
          <div className='about-project-container__description-line about-project-container__description-line__fill_light'>
            4 недели
          </div>
          <div className='about-project-container__subtext'>Front-end</div>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;

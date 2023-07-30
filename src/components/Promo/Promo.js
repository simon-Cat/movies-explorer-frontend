import './Promo.css';
import promo_img from '../../images/web_landing-logo.png';

const Promo = () => {
  return (
    <section className='promo-container'>
      <div className='promo-container__content'>
        <div className='promo-container__description'>
          <h1 className='promo-container__title'>Учебный проект студента факультета Веб-разработки.</h1>
          <p className='promo-container__subtitle'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <img src={promo_img} alt='Promo' />
      </div>
      <a className='promo-container__link' href='#about-project'>Узнать больше</a>
    </section>
  );
};

export default Promo;
import './MoviesCardList.css';
import { MoviesCard } from '../';

const MoviesCardList = ({ cards }) => {
  return (
    <section className='movies-cards-container'>
      <section className='movies-cards-container__list'>
        {cards.map((item, index) => (
          <MoviesCard key={item.id} card={item} />
        ))}
      </section>
      <button className='movies-cards-container__button'>Ещё</button>
    </section>
  );
};

export default MoviesCardList;
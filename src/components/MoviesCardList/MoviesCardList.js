import './MoviesCardList.css';
import { MoviesCard } from '../';
import { useLocation } from 'react-router-dom';

const MoviesCardList = ({ cards }) => {

  const location = useLocation();

  return (
    <section className='movies-cards-container'>
      <section className={`movies-cards-container__list ${ location.pathname === '/saved-movies' ? 'movies-cards-container__list_page_saved-movies' : '' }`}>
        {cards.map((item, index) => (
          <MoviesCard key={item.id} card={item} />
        ))}
      </section>
      { location.pathname === '/movies' && (
          <button className='movies-cards-container__button'>Ещё</button>
      ) }

    </section>
  );
};

export default MoviesCardList;
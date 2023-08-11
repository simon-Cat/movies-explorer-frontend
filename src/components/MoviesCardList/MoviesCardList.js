import './MoviesCardList.css';
import { MoviesCard } from '../';
import { useLocation } from 'react-router-dom';

const MoviesCardList = ({ cards }) => {
  const location = useLocation();

  return (
    <section
      className={`movies-cards-container ${
        location.pathname === '/saved-movies'
          ? 'movies-cards-container_page_saved-movies'
          : ''
      }`}
    >
      <ul className={`movies-cards-container__list`}>
        {cards.map((item, index) => (
          <MoviesCard key={item.id} card={item} />
        ))}
      </ul>
      {location.pathname === '/movies' && (
        <button className='movies-cards-container__button'>Ещё</button>
      )}
    </section>
  );
};

export default MoviesCardList;

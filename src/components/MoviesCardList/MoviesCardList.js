import './MoviesCardList.css';
import { MoviesCard } from '../';
import { useLocation } from 'react-router-dom';

const MoviesCardList = ({
  onShowNextMovies,
  isNextMoviesButtonShowed,
  cards,
}) => {
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
        <button
          onClick={onShowNextMovies}
          className={`movies-cards-container__button ${
            !isNextMoviesButtonShowed && 'movies-cards-container__button_hidden'
          }`}
        >
          Ещё
        </button>
      )}
    </section>
  );
};

export default MoviesCardList;

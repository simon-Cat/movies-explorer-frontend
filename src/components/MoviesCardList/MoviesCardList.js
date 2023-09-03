import './MoviesCardList.css';
import { MoviesCard } from '../';
import { useLocation } from 'react-router-dom';

const MoviesCardList = ({
  onShowNextMovies,
  isNextMoviesButtonShowed,
  savedMovies,
  movies,
  onAddFavoriteMovie,
  onRemoveFavoriteMovie,
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
        {movies.map((item, index) => (
          <MoviesCard
            savedMovies={savedMovies}
            key={item.id || item.movieId}
            onRemoveFavoriteMovie={onRemoveFavoriteMovie}
            onAddFavoriteMovie={onAddFavoriteMovie}
            card={item}
          />
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

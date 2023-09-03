import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { MOVIES_IMAGE_API_URL } from '../../utils/baseUrls';
import { getTimeFromMins } from '../../utils/getTimeFromMinutes';
import { useEffect, useState } from 'react';

const MoviesCard = ({
  card,
  savedMovies,
  onAddFavoriteMovie,
  onRemoveFavoriteMovie,
}) => {
  const location = useLocation();

  // state of like button
  const [isMoviesLiked, setIsMoviesLiked] = useState(false);

  // effect for state like button
  useEffect(() => {
    if (location.pathname === '/movies') {
      const isMovieFavorite = savedMovies.some(
        (savedMovie) => savedMovie.movieId === card.id
      );
      if (isMovieFavorite) {
        setIsMoviesLiked(true);
      } else {
        setIsMoviesLiked(false);
      }
    } else {
      return;
    }
  }, [savedMovies]);

  // click 'like' button
  const addLikeHandler = () => {
    onAddFavoriteMovie(card);
  };

  // click 'unlike' button
  const removeLikeHandler = () => {
    let cardId;

    if (location.pathname === '/movies') {
      const removedMovieIndex = savedMovies.findIndex(
        (savedMovie) => savedMovie.movieId === card.id
      );
      cardId = savedMovies[removedMovieIndex]._id;
    } else {
      cardId = card._id;
    }
    onRemoveFavoriteMovie(cardId);
  };

  return (
    <li className='movie-card'>
      <a href={card.trailerLink} target='_blank' rel='noreferrer'>
        <img
          className='movie-card__image'
          alt={`Кадр из фильма '${card.nameRU}'`}
          src={
            location.pathname === '/movies'
              ? `${MOVIES_IMAGE_API_URL}${card.image.url}`
              : `${card.image}`
          }
        />
      </a>
      <div className='movie-card__description'>
        <span className='movie-card__title'>{card.nameRU}</span>
        {location.pathname === '/movies' ? (
          <button
            onClick={!isMoviesLiked ? addLikeHandler : removeLikeHandler}
            className={`movie-card__button ${
              isMoviesLiked
                ? 'movie-card__button_type_filled-like'
                : 'movie-card__button_type__not-filled-like'
            }`}
          />
        ) : (
          <button
            onClick={removeLikeHandler}
            className='movie-card__button movie-card__button_type_remove-saved-movie'
          />
        )}
      </div>
      <p className='movie-card__duration'>{getTimeFromMins(card.duration)}</p>
    </li>
  );
};

export default MoviesCard;

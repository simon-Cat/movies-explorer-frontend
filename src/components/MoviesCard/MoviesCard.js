import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { MOVIES_IMAGE_API_URL } from '../../utils/baseUrls';
import { getTimeFromMins } from '../../utils/getTimeFromMinutes';

const MoviesCard = ({ card }) => {

  const location = useLocation();

  return (
    <li className='movie-card'>
      <img className='movie-card__image' alt={`Кадр из фильма "${card.nameRU}"`} src={`${MOVIES_IMAGE_API_URL}${card.image.url}`} />
      <div className='movie-card__description'>
        <a href={card.trailerLink} target='_blank' rel='noreferrer' className='movie-card__title'>{ card.nameRU }</a>
        {location.pathname === '/movies' ? (
          <button className={`movie-card__button ${card.like ? 'movie-card__button_type_filled-like' : 'movie-card__button_type__not-filled-like'}`} />
        ) : (
          <button className='movie-card__button movie-card__button_type_remove-saved-movie' />
        )}
      </div>
      <p className='movie-card__duration'>{ getTimeFromMins(card.duration) }</p>
    </li>
  );
};

export default MoviesCard;
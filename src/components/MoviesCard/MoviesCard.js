import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ card }) => {

  const location = useLocation();

  return (
    <li className='movie-card'>
      <img className='movie-card__image' alt={`Кадр из фильма "${card.title}"`} src={card.url} />
      <div className='movie-card__description'>
        <h2 className='movie-card__title'>{ card.title }</h2>
        {location.pathname === '/movies' ? (
          <button className={`movie-card__button ${card.like ? 'movie-card__button_type_filled-like' : 'movie-card__button_type__not-filled-like'}`} />
        ) : (
          <button className='movie-card__button movie-card__button_type_remove-saved-movie' />
        )}
      </div>
      <p className='movie-card__duration'>{ card.duration }</p>
    </li>
  );
};

export default MoviesCard;
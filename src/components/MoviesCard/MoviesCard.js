import './MoviesCard.css';

const MoviesCard = ({ card }) => {
  return (
    <article className='movie-card'>
      <img className='movie-card__image' alt={`Кадр из фильма "${card.title}"`} src={card.url} />
      <div className='movie-card__description'>
        <h2 className='movie-card__title'>{ card.title }</h2>
        <button className={`movie-card__like-button ${card.like ? 'movie-card__like-button_filled' : 'movie-card__like-button_not-filled'}`} />
      </div>
      <p className='movie-card__duration'>{ card.duration }</p>
    </article>
  );
};

export default MoviesCard;
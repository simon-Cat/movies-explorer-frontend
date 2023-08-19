import './MoviesCardList.css';
import { MoviesCard } from '../';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MoviesCardList = ({ onClick, showedMoviesLength, filtredMoviesLength, cards }) => {
  const location = useLocation();

  useEffect(() => {
    if (showedMoviesLength >= filtredMoviesLength) {
      setIsButtonShowed(false);
    } else {
      setIsButtonShowed(true);
    }
  }, [ showedMoviesLength, filtredMoviesLength ]);

  // show/hide button
  const [ isButtonShowed, setIsButtonShowed ] = useState(true);

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
        <button onClick={() => {onClick()}} className={`movies-cards-container__button ${!isButtonShowed && 'movies-cards-container__button_hidden'}`}>Ещё</button>
      )}
    </section>
  );
};

export default MoviesCardList;

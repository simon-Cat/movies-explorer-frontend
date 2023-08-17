import './Movies.css';
import { SearchForm, MoviesCardList, Preloader } from '../';
import { useState } from 'react';

const Movies = ({ externalClass, moviesCards = undefined, onSearchMovies }) => {
  // on/off preloader
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <section className={`movies-container`}>
      <SearchForm onSearchMovies={onSearchMovies} />
      {moviesCards && <MoviesCardList cards={moviesCards} />}
    </section>
  );
};

export default Movies;

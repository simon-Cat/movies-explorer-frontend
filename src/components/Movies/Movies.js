import './Movies.css';
import { SearchForm, MoviesCardList, Preloader } from '../';
import { useState } from 'react';

const Movies = ({ externalClass, moviesCards=undefined }) => {
  // on/off preloader
  const [ showPreloader, setShowPreloader ] = useState(true);

  return (
    <section className={`movies-container`}>
      <SearchForm />
      { moviesCards && showPreloader ? (
        <MoviesCardList cards={moviesCards} />
      ) : (
        <Preloader />
      ) }
    </section>
  );
};

export default Movies;
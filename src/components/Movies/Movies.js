import './Movies.css';
import { SearchForm, MoviesCardList, Preloader } from '../';

const Movies = ({ externalClass, moviesCards=undefined }) => {
  return (
    <main className={`movies-container ${externalClass}`}>
      <SearchForm />
      { moviesCards ? (
        <MoviesCardList cards={moviesCards} />
      ) : (
        <Preloader />
      ) }
    </main>
  );
};

export default Movies;
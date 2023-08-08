import './Movies.css';
import { SearchForm, MoviesCardList, Preloader } from '../';

const Movies = ({ externalClass, moviesCards=undefined }) => {
  return (
    <section className={`movies-container`}>
      <SearchForm />
      { moviesCards ? (
        <MoviesCardList cards={moviesCards} />
      ) : (
        <Preloader />
      ) }
    </section>
  );
};

export default Movies;
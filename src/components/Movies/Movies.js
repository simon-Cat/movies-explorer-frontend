import './Movies.css';
import { SearchForm, MoviesCardList, Preloader } from '../';

const Movies = ({ externalClass, moviesCards = undefined, onSearchMovies, isShowPreloader, }) => {
  return (
    <section className={`movies-container`}>
      <SearchForm onSearchMovies={onSearchMovies} />
      {moviesCards && <MoviesCardList cards={moviesCards} />}
      {isShowPreloader && <Preloader />}
    </section>
  );
};

export default Movies;

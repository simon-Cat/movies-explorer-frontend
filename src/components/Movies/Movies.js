import './Movies.css';
import { SearchForm, MoviesCardList } from '../';

const Movies = ({ externalClass, moviesCards }) => {
  return (
    <main className={`movies-container ${externalClass}`}>
      <SearchForm />
      <MoviesCardList cards={moviesCards} />
    </main>
  );
};

export default Movies;
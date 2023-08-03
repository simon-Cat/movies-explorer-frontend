import './Movies.css';
import { SearchForm, MoviesCardList } from '../';

const Movies = ({ externalClass }) => {
  return (
    <main className={`movies-container ${externalClass}`}>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
};

export default Movies;
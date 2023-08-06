import './SavedMovies.css';
import { SearchForm, MoviesCardList } from '../';
import { savedMovies } from '../../utils/data';

const SavedMovies = ({ externalClass, savedMoviesCards }) => {
  return (
    <section className={`saved-movies-container ${externalClass}`}>
      <SearchForm />
      <MoviesCardList cards={ savedMovies } />
    </section>
  );
};

export default SavedMovies;
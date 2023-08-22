import './SavedMovies.css';
import { SearchForm, MoviesCardList } from '../';
// import { savedMovies } from '../../utils/data';

const SavedMovies = ({ externalClass, moviesCards, onRemoveFavoriteMovie }) => {
  return (
    <section className={`saved-movies-container ${externalClass}`}>
      <SearchForm />
      <MoviesCardList onRemoveFavoriteMovie={onRemoveFavoriteMovie} cards={ moviesCards } />
    </section>
  );
};

export default SavedMovies;
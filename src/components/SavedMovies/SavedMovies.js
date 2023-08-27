import './SavedMovies.css';
import { SearchForm, MoviesCardList } from '../';

const SavedMovies = ({
  externalClass,
  savedMovies,
  onRemoveFavoriteMovie,
  savedMoviesSearchRequest,
  onChangeRequestData,
  onSearchMovies,
}) => {

  return (
    <section className={`saved-movies-container ${externalClass}`}>
      <SearchForm
        searchRequestData={savedMoviesSearchRequest}
        onSubmit={onSearchMovies}
        onChangeRequestData={onChangeRequestData}
      />
      {savedMovies.length ? (
        <MoviesCardList
          onRemoveFavoriteMovie={onRemoveFavoriteMovie}
          movies={savedMovies}
        />
      ) : null}
    </section>
  );
};

export default SavedMovies;

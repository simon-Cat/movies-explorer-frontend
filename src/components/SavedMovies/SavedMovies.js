import './SavedMovies.css';
import { SearchForm, MoviesCardList } from '../';
import { useEffect } from 'react';
import { NoResults } from '../';
import { filterOutMovies } from '../../utils/utilsFuncs';

const SavedMovies = ({
  externalClass,
  savedMovies,
  onRemoveFavoriteMovie,
  savedMoviesSearchRequest,
  onChangeRequestData,
  onSearchMovies,
  savedFiltredMovies,
  setSavedFiltredMovies,
  isShowNoResultMessageForSavedMovies,
}) => {
  useEffect(() => {
    if (!savedMoviesSearchRequest.inputValue) {
      setSavedFiltredMovies(savedMovies);
    } else {
      const curr = filterOutMovies(savedMovies, savedMoviesSearchRequest.inputValue, savedMoviesSearchRequest.checkboxState);
      setSavedFiltredMovies(curr);
    }
  }, [savedMovies]);

  return (
    <section className={`saved-movies-container ${externalClass}`}>
      <SearchForm
        searchRequestData={savedMoviesSearchRequest}
        onSubmit={onSearchMovies}
        onChangeRequestData={onChangeRequestData}
      />
      {savedFiltredMovies.length ? (
        <MoviesCardList
          onRemoveFavoriteMovie={onRemoveFavoriteMovie}
          movies={savedFiltredMovies}
        />
      ) : null}
      { isShowNoResultMessageForSavedMovies &&  <NoResults /> }
    </section>
  );
};

export default SavedMovies;

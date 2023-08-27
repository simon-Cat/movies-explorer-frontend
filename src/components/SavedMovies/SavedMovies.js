import './SavedMovies.css';
import { SearchForm, MoviesCardList } from '../';
import { useEffect, useState } from 'react';
import { filterOutMovies } from '../../utils/utilsFuncs';

const SavedMovies = ({
  externalClass,
  savedMovies,
  onRemoveFavoriteMovie,
  savedMoviesSearchRequest,
  onChangeRequestData,
  onSearchMovies,
}) => {
  const [showedMovies, setShowedMovies] = useState([]);

  useEffect(() => {
    const { inputValue, checkboxState } = savedMoviesSearchRequest;
    let showedMovies;

    if (!inputValue && !checkboxState) {
      showedMovies = savedMovies;
    } else if (!inputValue && checkboxState) {
      showedMovies = savedMovies.filter(
        (savedMovie) => savedMovie.duration <= 40
      );
    } else {
      showedMovies = filterOutMovies(savedMovies, inputValue, checkboxState);
    }

    setShowedMovies(showedMovies);
  }, [savedMovies]);

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
          movies={showedMovies}
        />
      ) : null}
    </section>
  );
};

export default SavedMovies;

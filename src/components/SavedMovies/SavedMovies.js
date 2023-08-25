import './SavedMovies.css';
import { SearchForm, MoviesCardList } from '../';
import { useEffect, useState } from 'react';
import { filterOutMovies } from '../../utils/utilsFuncs';

const SavedMovies = ({
  externalClass,
  savedMovies,
  onRemoveFavoriteMovie,
  savedMoviesSearchRequest,
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
  }, [
    savedMovies,
    savedMoviesSearchRequest.inputValue,
    savedMoviesSearchRequest.checkboxState,
  ]);

  return (
    <section className={`saved-movies-container ${externalClass}`}>
      <SearchForm
        searchRequestData={savedMoviesSearchRequest}
        onSubmit={onSearchMovies}
      />
      <MoviesCardList
        onRemoveFavoriteMovie={onRemoveFavoriteMovie}
        movies={showedMovies}
      />
    </section>
  );
};

export default SavedMovies;

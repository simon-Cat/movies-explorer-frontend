import './Movies.css';
import {
  SearchForm,
  MoviesCardList,
  Preloader,
  NoResults,
  ServerErrorMessage,
} from '../';
import { useState, useEffect } from 'react';
import { filterOutMovies } from '../../utils/utilsFuncs';

const Movies = ({
  externalClass,
  savedMovies,
  movies,
  moviesCount,
  onSearchMovies,
  isShowPreloader,
  isShowMoviesCardList,
  isShowNoResultMessage,
  isShowErrorMessage,
  onAddFavoriteMovie,
  onRemoveFavoriteMovie,
  checkFiltredMoviesLength,
  moviesSearchRequest,
  onChangeRequestData,
}) => {
  const [filtredMovies, setFiltredMovies] = useState([]);
  const [showedMovies, setShowedMovies] = useState([]);
  // // show/hide button for show
  // // next movies
  const [isNextMoviesButtonShowed, setIsNextMoviesButtonShowed] =
    useState(true);

  // user data from local storage
  useEffect(() => {
    if (!movies.length) {
      const dataIntoLocakStorage = localStorage.getItem('data');
      if (dataIntoLocakStorage) {
        const data = JSON.parse(dataIntoLocakStorage);
        const inputValue = data.inputValue;
        const checkboxState = data.checkbox;
        const filtredMovies = data.filtredMovies;

        onChangeRequestData({
          ...moviesSearchRequest,
          inputValue: inputValue,
          checkboxState: checkboxState,
        });
        setFiltredMovies(filtredMovies);
        checkFiltredMoviesLength(filtredMovies);
      }
    }
  }, []);

  // effect for filtration
  useEffect(() => {
    const dataIntoLocakStorage = localStorage.getItem('data');
    if (!movies.length && dataIntoLocakStorage) {
      return;
    }
    const inputValue = moviesSearchRequest.inputValue
      .trim()
      .toLocaleLowerCase();
    const checkboxState = moviesSearchRequest.checkboxState;
    const currentFiltrerdMovies = filterOutMovies(
      movies,
      inputValue,
      checkboxState
    );

    setFiltredMovies(currentFiltrerdMovies);
  }, [
    movies,
    moviesSearchRequest.inputValue,
    moviesSearchRequest.checkboxState,
  ]);

  // effect for showed movies
  useEffect(() => {
    if (!movies.length && !filtredMovies.length) {
      return;
    } else {
      checkFiltredMoviesLength(filtredMovies);
    }

    const inputValue = moviesSearchRequest.inputValue
      .trim()
      .toLocaleLowerCase();
    const checkboxState = moviesSearchRequest.checkboxState;

    // save data into LS
    localStorage.setItem(
      'data',
      JSON.stringify({
        filtredMovies: filtredMovies,
        inputValue: inputValue,
        checkbox: checkboxState,
      })
    );
    const currentShowedMovies = filtredMovies.slice(
      0,
      moviesCount.initialCount
    );

    setShowedMovies(currentShowedMovies);
  }, [filtredMovies]);

  // effect for show next movies button
  useEffect(() => {
    const showedMoviesLength = showedMovies.length;
    const filtredMoviesLength = filtredMovies.length;

    if (showedMoviesLength >= filtredMoviesLength) {
      setIsNextMoviesButtonShowed(false);
    } else {
      setIsNextMoviesButtonShowed(true);
    }
  }, [showedMovies]);

  // effect for change window's width
  useEffect(() => {
    const currentShowedMovies = filtredMovies.slice(
      0,
      moviesCount.initialCount
    );
    setShowedMovies(currentShowedMovies);
  }, [moviesCount]);

  // show next movies
  const showNextMoives = () => {
    // length of showed movies array
    const showedMoviesLength = showedMovies.length;
    // array of additional movies
    const additionalMovies = filtredMovies.slice(
      showedMoviesLength,
      showedMoviesLength + moviesCount.additionalCount
    );
    setShowedMovies([...showedMovies, ...additionalMovies]);
  };

  return (
    <section className={`movies-container`}>
      <SearchForm
        onSubmit={onSearchMovies}
        searchRequestData={moviesSearchRequest}
      />
      {isShowMoviesCardList && (
        <MoviesCardList
          onShowNextMovies={showNextMoives}
          isNextMoviesButtonShowed={isNextMoviesButtonShowed}
          savedMovies={savedMovies}
          movies={showedMovies}
          onAddFavoriteMovie={onAddFavoriteMovie}
          onRemoveFavoriteMovie={onRemoveFavoriteMovie}
        />
      )}
      {isShowNoResultMessage && <NoResults />}
      {isShowErrorMessage && <ServerErrorMessage />}
      {isShowPreloader && <Preloader />}
    </section>
  );
};

export default Movies;

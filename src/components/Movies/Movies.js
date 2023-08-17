import './Movies.css';
import { SearchForm, MoviesCardList, Preloader } from '../';
import { getMovies } from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';

const Movies = ({
  externalClass,
  moviesCards,
  onSearchMovies,
  searchInputValue,
}) => {
  useEffect(() => {
    const userInputValue = searchInputValue.trim().toLowerCase();
    if (!userInputValue) {
      return;
    }
    const filtredMovies = moviesCards.filter((movie) => {
      const movieNameRU = movie.nameRU.trim().toLowerCase();
      const movieNameEN = movie.nameEN.trim().toLowerCase();

      return (
        movieNameRU.includes(userInputValue) ||
        movieNameEN.includes(userInputValue)
      );
    });

    if (filtredMovies.length > 0) {
      setIsShowNoResultMessage(false);
      setFiltredMovies(filtredMovies);
      setIsShowMoviesCardList(true);
    } else {
      setFiltredMovies('');
      setIsShowNoResultMessage(true);
    }
  }, [moviesCards, searchInputValue]);

  // filtred movies
  const [filtredMovies, setFiltredMovies] = useState('');

  // show movies card list
  const [isShowMoviesCardList, setIsShowMoviesCardList] = useState(false);

  // prelodaer state
  const [isShowPreloader, setIsShowPreloader] = useState(false);

  // no result message
  const [isShowNoResultMessage, setIsShowNoResultMessage] = useState(false);

  // show error message
  const [isShowErrorMessage, setIsShowErrorMessage] = useState(false);

  // on/off preloader
  const onLoading = () => {
    setIsShowPreloader((isShowPreloader) => !isShowPreloader);
  };

  // search movies
  const onSubmit = (requsetInputValue) => {
    setIsShowNoResultMessage(false);
    setIsShowErrorMessage(false);
    setIsShowMoviesCardList(false);
    onLoading();
    getMovies()
      .then((res) => {
        onLoading();
        onSearchMovies(res, requsetInputValue);
      })
      .catch((err) => {
        onLoading();
        setIsShowErrorMessage(true);
      });
  };

  return (
    <section className={`movies-container`}>
      <SearchForm onSubmit={onSubmit} />
      {isShowMoviesCardList && <MoviesCardList cards={filtredMovies} />}
      {isShowNoResultMessage && <p>Ничего не найдено</p>}
      {isShowErrorMessage && (
        <p>
          Во время запроса произошла ошибка. Возможно, проблема с соединением
          или сервер недоступен. Подождите немного и попробуйте ещё раз
        </p>
      )}
      {isShowPreloader && <Preloader />}
    </section>
  );
};

export default Movies;

import './Movies.css';
import { SearchForm, MoviesCardList, Preloader } from '../';
import { getMovies } from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';
import { checkWindowWidth } from '../../utils/checkWindowWidth';

const Movies = ({
  externalClass,
  moviesCards,
  onSearchMovies,
  searchInputValue,
  onChangeCheckbox,
  checkboxState,
}) => {
  // movies count
  const [moviesCount, setMoviesCount] = useState({
    initialCount: null,
    additionalCount: null,
  });

  // resize handler
  useEffect(() => {
    // get window witdh
    const windowWidth = window.outerWidth;

    checkWindowWidth(windowWidth, moviesCount, setMoviesCount);

    // add event listener
    const resizeEvent = window.addEventListener('resize', (e) => {
      const windowWidth = e.target.outerWidth;
      setTimeout(() => {
        checkWindowWidth(windowWidth, moviesCount, setMoviesCount);
      }, 2000);
    });
    return window.removeEventListener('resize', resizeEvent);
  }, []);

  // return filtredMovies
  useEffect(() => {
    let userInputValue;

    if (!searchInputValue) {
      return;
    } else {
      // to lower case and trim
      userInputValue = searchInputValue.trim().toLowerCase();
    }

    // get filtred movies
    const filtredMovies = moviesCards.filter((movie) => {
      const movieNameRU = movie.nameRU.trim().toLowerCase();
      const movieNameEN = movie.nameEN.trim().toLowerCase();
      const movieDuration = movie.duration;

      if (checkboxState) {
        return (
          movieDuration <= 40 &&
          (movieNameRU.includes(userInputValue) ||
            movieNameEN.includes(userInputValue))
        );
      } else {
        return (
          movieNameRU.includes(userInputValue) ||
          movieNameEN.includes(userInputValue)
        );
      }
    });

    // get showedMovies
    const showedMovies = filtredMovies.slice(0, moviesCount.initialCount);

    if (filtredMovies.length > 0) {
      // hide no result's message
      setIsShowNoResultMessage(false);
      // set value for filtred movies
      setFiltredMovies(filtredMovies);
      // set value for showed movies
      setShowedMovies(showedMovies);
      // show movies card list
      setIsShowMoviesCardList(true);
    } else {
      // clear filtred movies state
      setFiltredMovies('');
      // clear showed movies state
      setShowedMovies('');
      // show no result's message
      setIsShowNoResultMessage(true);
      // hide movies card list
      setIsShowMoviesCardList(false);
    }
  }, [moviesCards, searchInputValue, moviesCount, checkboxState]);

  // filtred movies
  const [filtredMovies, setFiltredMovies] = useState('');

  // filtred showed movies
  const [showedMovies, setShowedMovies] = useState([]);

  // show/hide movies card list
  const [isShowMoviesCardList, setIsShowMoviesCardList] = useState(false);

  // show/hide prelodaer
  const [isShowPreloader, setIsShowPreloader] = useState(false);

  // show/hide no result message
  const [isShowNoResultMessage, setIsShowNoResultMessage] = useState(false);

  // show/hide error message
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
      <SearchForm onSubmit={onSubmit} onChangeCheckbox={onChangeCheckbox} checkboxState={checkboxState} />
      {isShowMoviesCardList && (
        <MoviesCardList
          onClick={showNextMoives}
          showedMoviesLength={showedMovies.length}
          filtredMoviesLength={filtredMovies.length}
          cards={showedMovies}
        />
      )}
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

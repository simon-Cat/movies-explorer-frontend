import {
  WINDOW_WIDTH_LARGE,
  MOVIES_COUNT_FOR_LARGE_WIDTH,
  MOVIES_COUNT_FOR_SMALL_WIDTH,
  SHORT_MOVIE_DURATION,
} from './data';

// check window width and
// set initial and additional
// count of movies
export const checkWindowWidth = (windowWidth, stateValue, stateFunction) => {
  if (windowWidth >= WINDOW_WIDTH_LARGE) {
    stateFunction({ ...stateValue, ...MOVIES_COUNT_FOR_LARGE_WIDTH });
  } else {
    stateFunction({ ...stateValue, ...MOVIES_COUNT_FOR_SMALL_WIDTH });
  }
};

// filter out movies
export const filterOutMovies = (movies, inputValue, checkboxValue) => {
  const filtredMovies = movies.filter((movie) => {
    const movieNameRU = movie.nameRU.trim().toLowerCase();
    const movieNameEN = movie.nameEN.trim().toLowerCase();
    const movieDuration = movie.duration;
    const userInputValue = inputValue.trim().toLowerCase();

    if (checkboxValue) {
      return (
        movieDuration <= SHORT_MOVIE_DURATION &&
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

  return filtredMovies;
};

// save item into local storage
export const saveItemIntoLocalStorage = (itemName, itemValue) => {
  localStorage.setItem(itemName, JSON.stringify(itemValue));
};

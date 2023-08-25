// check window width and
// set initial and additional
// count of movies
export const checkWindowWidth = (windowWidth, stateValue, stateFunction) => {
  if (windowWidth >= 768) {
    stateFunction({ ...stateValue, initialCount: 16, additionalCount: 4 });
  } else {
    stateFunction({ ...stateValue, initialCount: 5, additionalCount: 2 });
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

  return filtredMovies;
};

// save item into local storage
export const saveItemIntoLocalStorage = (itemName, itemValue) => {
  localStorage.setItem(itemName, JSON.stringify(itemValue));
};

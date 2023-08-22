import './Movies.css';
import { SearchForm, MoviesCardList, Preloader } from '../';

const Movies = ({
  externalClass,
  moviesCards,
  onSearchMovies,
  searchInputValue,
  onChangeCheckbox,
  checkboxState,
  onChangeInputValue,
  isShowPreloader,
  isShowMoviesCardList,
  isShowNoResultMessage,
  isShowErrorMessage,
  onShowNextMovies,
  isNextMoviesButtonShowed,
}) => {
  return (
    <section className={`movies-container`}>
      <SearchForm
        onSubmit={onSearchMovies}
        onChangeCheckbox={onChangeCheckbox}
        checkboxState={checkboxState}
        inputValue={searchInputValue}
        onChangeInputValue={onChangeInputValue}
      />
      {isShowMoviesCardList && (
        <MoviesCardList
          onShowNextMovies={onShowNextMovies}
          isNextMoviesButtonShowed={isNextMoviesButtonShowed}
          cards={moviesCards}
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

import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  Header,
  Main,
  Footer,
  NotFoundPage,
  Movies,
  SavedMovies,
  Popup,
  Profile,
  Register,
  Login,
  ProtectedRoute,
} from '../';
import { useState, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import { getMovies } from '../../utils/MoviesApi';
import { checkWindowWidth } from '../../utils/utilsFuncs';
import { MOVIES_IMAGE_API_URL } from '../../utils/baseUrls';

function App() {
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

  // location
  const location = useLocation();

  // navigate
  const navigate = useNavigate();

  // currentUser for Context
  const [currentUser, setCurrentUser] = useState({});

  // user logined or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // show/hide popup
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  // movies array
  const [movies, setMovies] = useState([]);

  // movies search request
  const [moviesSearchRequest, setMoviesSearchRequest] = useState({
    inputValue: '',
    checkboxState: false,
  });

  // saved movies
  const [savedMovies, setSavedMovies] = useState([]);

  // saved movies search request
  const [savedMoviesSearchRequest, setSavedMoviesSearchRequest] = useState({
    inputValue: '',
    checkboxState: false,
  });

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

  // movies count
  const [moviesCount, setMoviesCount] = useState({
    initialCount: null,
    additionalCount: null,
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        mainApi.getUserInfo({
          'Content-type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      ])
        .then(([{ name, email }]) => {
          setCurrentUser({ ...currentUser, name, email });
        })
        .catch((err) => {
          console.log(err);
        });
    } else return;
  }, [isLoggedIn]);

  // effect for get saved movies
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };

      getSavedMovies(headers);
    }
  }, []);

  // switch popup state
  const handleSwitchPopupState = () => {
    setIsPopupOpened(!isPopupOpened);
  };

  // signin
  const onLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    navigate('/movies', { replace: true });
  };

  // signout
  const onSignOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  // logout reset

  // update profile handler
  const onUpdateProfile = (updatedUserData) => {
    setCurrentUser({ ...currentUser, ...updatedUserData });
  };

  // search movies
  const onSearchMovies = (searchValue) => {
    if (!movies.length) {
      setIsShowNoResultMessage(false);
      setIsShowErrorMessage(false);
      setIsShowMoviesCardList(false);

      onLoading();

      getMovies()
        .then((res) => {
          onLoading();
          setMovies(res);
        })
        .catch((err) => {
          onLoading();
          setIsShowErrorMessage(true);
        });
    }
    setMoviesSearchRequest({ ...moviesSearchRequest, ...searchValue });
  };

  // check filtered movies length
  const checkFiltredMoviesLength = (filtredMovies) => {
    if (filtredMovies.length > 0) {
      // hide no result's message
      setIsShowNoResultMessage(false);
      // show movies card list
      setIsShowMoviesCardList(true);
    } else {
      // show no result's message
      setIsShowNoResultMessage(true);
      // hide movies card list
      setIsShowMoviesCardList(false);
    }
  };

  // get saved movies
  const getSavedMovies = (headers) => {
    mainApi
      .getSavedMovies(headers)
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // add favorite movie handler
  const onAddFavoriteMovie = (favoriteMovie) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const image = `${MOVIES_IMAGE_API_URL}${favoriteMovie.image.url}`;
    const thumbnail = `${MOVIES_IMAGE_API_URL}${favoriteMovie.image.formats.thumbnail.url}`;

    // movie object for send to server
    const movieObj = {
      nameRU: favoriteMovie.nameRU,
      nameEN: favoriteMovie.nameEN,
      director: favoriteMovie.director,
      country: favoriteMovie.country,
      year: favoriteMovie.year,
      duration: favoriteMovie.duration,
      description: favoriteMovie.description,
      trailerLink: favoriteMovie.trailerLink,
      image: image,
      thumbnail: thumbnail,
      movieId: favoriteMovie.id,
    };

    mainApi
      .addFavoriteMovie(movieObj, headers)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // remove favorite movie handler
  const onRemoveFavoriteMovie = (favoriteMovieID) => {
    const token = localStorage.getItem('token');

    mainApi
      .removeFavoriteMovie(favoriteMovieID, {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      })
      .then((res) => {
        const updateSavedMovies = savedMovies.filter(
          (movie) => movie._id !== favoriteMovieID
        );
        setSavedMovies(updateSavedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // submit form into saved movies
  const onSubmitSavedMoviesForm = (searchValue) => {
    setSavedMoviesSearchRequest({
      ...savedMoviesSearchRequest,
      ...searchValue,
    });
  };

  return (
    <div className='App'>
      <CurrentUserContext.Provider value={currentUser}>
        {(location.pathname === '/' ||
          location.pathname === '/movies' ||
          location.pathname === '/saved-movies' ||
          location.pathname === '/profile') && (
          <Header
            externalClass='app__header-container'
            location={location}
            switchPopupStateHandler={handleSwitchPopupState}
            isLoggedIn={isLoggedIn}
          />
        )}
        <main className='app__main-container'>
          <Routes>
            <Route path='*' element={<NotFoundPage />} />
            <Route
              path='/'
              element={<Main externalClass='app__main-container' />}
            />
            <Route
              path='/movies'
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Movies}
                  movies={movies}
                  savedMovies={savedMovies}
                  moviesCount={moviesCount}
                  onSearchMovies={onSearchMovies}
                  moviesSearchRequest={moviesSearchRequest}
                  onChangeRequestData={setMoviesSearchRequest}
                  isShowPreloader={isShowPreloader}
                  isShowMoviesCardList={isShowMoviesCardList}
                  isShowNoResultMessage={isShowNoResultMessage}
                  isShowErrorMessage={isShowErrorMessage}
                  onAddFavoriteMovie={onAddFavoriteMovie}
                  onRemoveFavoriteMovie={onRemoveFavoriteMovie}
                  checkFiltredMoviesLength={checkFiltredMoviesLength}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={SavedMovies}
                  savedMovies={savedMovies}
                  onRemoveFavoriteMovie={onRemoveFavoriteMovie}
                  savedMoviesSearchRequest={savedMoviesSearchRequest}
                  onSearchMovies={onSubmitSavedMoviesForm}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Profile}
                  onSignOut={onSignOut}
                  onUpdateProfile={onUpdateProfile}
                />
              }
            />
            <Route
              path='/signin'
              element={
                <Login externalClass='app__login-container' onLogin={onLogin} />
              }
            />
            <Route
              path='/signup'
              element={<Register externalClass='app__register-container' onLogin={onLogin} />}
            />
          </Routes>
        </main>
        {(location.pathname === '/' ||
          location.pathname === '/movies' ||
          location.pathname === '/saved-movies') && (
          <Footer externalClass='app__footer-container' />
        )}
        <Popup name='layer' isOpen={isPopupOpened} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

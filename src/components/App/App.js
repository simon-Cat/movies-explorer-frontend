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
import { savedMovies } from '../../utils/data';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import { getMovies } from '../../utils/MoviesApi';
import { filterOutMovies, checkWindowWidth } from '../../utils/utilsFuncs';

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

  // filtred movies
  const [filtredMovies, setFiltredMovies] = useState([]);

  // showed movies
  const [showedMovies, setShowedMovies] = useState([]);

  // saved movies
  // const [ savedMovies, setSavedMovies ] = useState([]);

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

  // show/hide button for show
  // next movies
  const [isNextMoviesButtonShowed, setIsNextMoviesButtonShowed] =
    useState(true);

  // value of user's input
  const [searchInputValue, setSearchInputValue] = useState('');

  // state of filter checkbox
  const [checkboxState, setCheckboxState] = useState(false);

  // user data from local storage
  useEffect(() => {
    if (!movies.length) {
      const ls = localStorage.getItem('data');
      if (ls) {
        const data = JSON.parse(ls);

        onChangeCheckbox(data.checkbox);
        onChangeInputValue(data.inputValue);
        onChangeFiltredMovies(data.filtredMovies);
      }
    }
  }, []);

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
          navigate('/movies');
        })
        .catch((err) => {
          console.log(err);
        });
    } else return;
  }, [isLoggedIn]);

  // effect for filtration
  useEffect(() => {
    if (!movies.length) {
      return;
    }
    console.log('effect for filtration');
    getFilteredMovies();
  }, [movies, checkboxState]);

  // effect for showed movies
  useEffect(() => {
    // if movies array is empty
    //  hide no result message
    if (!movies.length && !filtredMovies.length) {
      return;
    } else {
      checkFiltredMoviesLength();
    }
    console.log('effect for showed movies');

    // save data into LS
    localStorage.setItem(
      'data',
      JSON.stringify({
        filtredMovies: filtredMovies,
        inputValue: searchInputValue,
        checkbox: checkboxState,
      })
    );

    getShowedMovies();
  }, [filtredMovies, moviesCount]);

  // effect for show/hide button for
  // show next movies
  useEffect(() => {
    changeStateOfNextMoviesButton();
  }, [showedMovies]);

  // switch popup state
  const handleSwitchPopupState = () => {
    setIsPopupOpened(!isPopupOpened);
  };

  // signin
  const onLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  };

  // signout
  const onSignOut = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  // update profile handler
  const onUpdateProfile = (updatedUserData) => {
    setCurrentUser({ ...currentUser, ...updatedUserData });
  };

  // change state for input value
  const onChangeInputValue = (searchValue) => {
    setSearchInputValue(searchValue);
  };

  // change state for filtred movies
  const onChangeFiltredMovies = (value) => {
    setFiltredMovies(value);
  };

  // filter out movies handler
  const getFilteredMovies = () => {
    console.log('getFilteredMovies');
    const currentFiltrerdMovies = filterOutMovies(
      movies,
      searchInputValue.toLocaleLowerCase(),
      checkboxState
    );

    setFiltredMovies(currentFiltrerdMovies);
  };

  // get showed movies
  const getShowedMovies = () => {
    const currentShowedMovies = filtredMovies.slice(
      0,
      moviesCount.initialCount
    );
    setShowedMovies(currentShowedMovies);
  };

  // search movies
  const onSearchMovies = (searchValue) => {
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
  };

  // change checkbox state
  const onChangeCheckbox = (state) => {
    if (localStorage.getItem('data') && !movies.length) {
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
    setCheckboxState(state);
  };

  // check filtered movies length
  const checkFiltredMoviesLength = () => {
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

  // show/hide button to show
  // next movies
  const changeStateOfNextMoviesButton = () => {
    const showedMoviesLength = showedMovies.length;
    const filtredMoviesLength = filtredMovies.length;

    if (showedMoviesLength >= filtredMoviesLength) {
      setIsNextMoviesButtonShowed(false);
    } else {
      setIsNextMoviesButtonShowed(true);
    }
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
                  moviesCards={showedMovies}
                  onSearchMovies={onSearchMovies}
                  searchInputValue={searchInputValue}
                  onChangeCheckbox={onChangeCheckbox}
                  checkboxState={checkboxState}
                  onChangeInputValue={onChangeInputValue}
                  isShowPreloader={isShowPreloader}
                  isShowMoviesCardList={isShowMoviesCardList}
                  isShowNoResultMessage={isShowNoResultMessage}
                  isShowErrorMessage={isShowErrorMessage}
                  onShowNextMovies={showNextMoives}
                  isNextMoviesButtonShowed={isNextMoviesButtonShowed}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={SavedMovies}
                  moviesCards={savedMovies}
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
              element={<Register externalClass='app__register-container' />}
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

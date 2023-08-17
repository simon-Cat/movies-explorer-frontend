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

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [ movies, setMovies ] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');

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
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  // updateProfile
  const onUpdateProfile = (updatedUserData) => {
    setCurrentUser({ ...currentUser, ...updatedUserData });
  };

  // search movies
  const onSearchMovies = (res, searchValue) => {
    setMovies((movies) => res);
    setSearchInputValue(searchValue);
  }

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
                  moviesCards={movies}
                  onSearchMovies={onSearchMovies}
                  searchInputValue={searchInputValue}
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

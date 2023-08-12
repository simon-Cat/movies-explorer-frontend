import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import { useState } from 'react';
import { movies, savedMovies } from '../../utils/data';

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPopupOpened, setIsPopupOpened] = useState(false);

  const handleSwitchPopupState = () => {
    setIsPopupOpened(!isPopupOpened);
  };

  return (
    <div className='App'>
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
              <ProtectedRoute isLoggedIn={isLoggedIn} element={Profile} />
            }
          />
          <Route
            path='/signin'
            element={<Login externalClass='app__login-container' />}
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
    </div>
  );
}

export default App;

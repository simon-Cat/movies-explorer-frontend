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
} from '../';
import { useState } from 'react';
import { movies, savedMovies } from '../../utils/data';

function App() {
  const location = useLocation();
  const [ isSignin, setIsSignin ] = useState(false);
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
          isSignin={isSignin}
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
              <Movies
                externalClass='app__movies-container'
                moviesCards={movies}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <SavedMovies
                savedMoviesCards={savedMovies}
                externalClass='app__saved-movies-container'
              />
            }
          />
          <Route
            path='/profile'
            element={<Profile extrenalClass='app__profile-container' />}
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

import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header, Main, Footer, NotFoundPage, Movies, SavedMovies, Popup, Profile } from '../';
import { useState } from 'react';
import { movies, savedMovies } from '../../utils/data';

function App() {

  const location = useLocation();
  const [ isPopupOpened, setIsPopupOpened ] = useState(false);

  const handleSwitchPopupState = () => {
    setIsPopupOpened(!isPopupOpened);
  };

  return (
    <div className="App">
      <Header externalClass='app__header-container' location={location} switchPopupStateHandler={handleSwitchPopupState} />
        <Routes>
          <Route path='/' element={<Main externalClass='app__main-container' />} />
          <Route path='/movies' element={<Movies externalClass='app__movies-container' />} />
          <Route path='/saved-movies' element={<SavedMovies savedMoviesCards={savedMovies} externalClass='app__saved-movies-container' />} />
          <Route path='/profile' element={<Profile extrenalClass='app__profile-container' />} />
          <Route path='/signin' />
          <Route path='/signup' />
        </Routes>
      { (location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies') &&  <Footer externalClass='app__footer-container' /> }
      <Popup name='layer' isOpen={isPopupOpened} />
      {/* <NotFoundPage /> */}
    </div>
  );
}

export default App;

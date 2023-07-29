import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header, Main, Footer, NotFoundPage } from '../';

function App() {
  return (
    <div className="App">
      <Header externalClass='app__header-container' />
      <Main externalClass='app__main-container' />
      <Footer externalClass='app__footer-container' />
      {/* <NotFoundPage /> */}
      <Routes>
        <Route path='/' />
        <Route path='/movies' />
        <Route path='/saved-movies' />
        <Route path='/profile' />
        <Route path='/signin' />
        <Route path='/signup' />
      </Routes>
    </div>
  );
}

export default App;

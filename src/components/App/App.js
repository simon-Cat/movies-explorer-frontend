import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header, Main, Footer, NotFoundPage } from '../';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
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

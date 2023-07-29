import './Main.css';
import { Promo, AboutProject, Techs, AboutMe } from '../index';

const Main = () => {
  return (
    <main className='main-container'>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  )
};

export default Main;
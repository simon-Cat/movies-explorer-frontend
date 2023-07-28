import './Main.css';
import { Promo, AboutProject, Techs } from '../index';

const Main = () => {
  return (
    <main className='main-container'>
      <Promo />
      <AboutProject />
      <Techs />
    </main>
  )
};

export default Main;
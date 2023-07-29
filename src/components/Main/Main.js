import './Main.css';
import { Promo, AboutProject, Techs, AboutMe } from '../index';

const Main = ({ externalClass }) => {
  return (
    <main className={`main-container ${externalClass}`}>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  )
};

export default Main;
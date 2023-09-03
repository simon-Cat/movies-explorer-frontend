import './Main.css';
import { Promo, AboutProject, Techs, AboutMe } from '../index';

const Main = ({ externalClass }) => {
  return (
    <>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </>
  );
};

export default Main;

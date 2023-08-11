import './Gamburger.css';

const Gamburger = ({ externalClass, changeGamburgerStateHandler }) => {
  return (
    <ul onClick={changeGamburgerStateHandler} className={`gamburger-menu-container ${externalClass}`}>
      <li className='gamburger-menu-container__item'></li>
      <li className='gamburger-menu-container__item'></li>
      <li className='gamburger-menu-container__item'></li>
    </ul>
  );
};

export default Gamburger;
import './Gamburger.css';

const Gamburger = ({ externalClass, changeGamburgerStateHandler }) => {
  return (
    <div onClick={changeGamburgerStateHandler} className={`gamburger-menu-container ${externalClass}`}>
      <div className='gamburger-menu-container__item'></div>
      <div className='gamburger-menu-container__item'></div>
      <div className='gamburger-menu-container__item'></div>
    </div>
  );
};

export default Gamburger;
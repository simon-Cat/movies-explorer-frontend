import './FilterCheckbox.css';
import { useState } from 'react';

const FilterCheckbox = ({ externalClass }) => {

  const [ isChecked, setIsChecked ] = useState(false);
  const handleSwitchCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={`filter-checkbox-container ${externalClass}`}>
      <input id='switcher-checkbox' type='checkbox' className='filter-checkbox-container__checkbox' />
      <label htmlFor='switcher-checkbox' onClick={handleSwitchCheckbox} className='filter-checkbox-container__custom-checkbox'>
        <div className={`filter-checkbox-container__custom-checkbox-switcher ${!isChecked ? 'filter-checkbox-container__custom-checkbox-switcher_state_off' : 'filter-checkbox-container__custom-checkbox-switcher_state_on'}`}></div>
      </label>
      <span className='filter-checkbox-container__text'>Короткометражки</span>
    </div>
  );
};

export default FilterCheckbox;

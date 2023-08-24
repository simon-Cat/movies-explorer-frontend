import './FilterCheckbox.css';
import { useEffect, useState } from 'react';

const FilterCheckbox = ({
  externalClass,
  onChangeCheckbox,
  searchRequestData,
}) => {
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    const { checkboxState } = searchRequestData;
    setCheckbox(checkboxState);
  }, [searchRequestData]);

  const changeChekboxHandler = (e) => {
    const checkboxState = e.target.checked;
    setCheckbox(checkboxState);
    onChangeCheckbox({ checkboxState: checkboxState });
  };

  return (
    <div className={`filter-checkbox-container ${externalClass}`}>
      <input
        checked={checkbox}
        onChange={(e) => {
          changeChekboxHandler(e);
        }}
        id='switcher-checkbox'
        type='checkbox'
        className='filter-checkbox-container__checkbox'
      />
      <label
        htmlFor='switcher-checkbox'
        className='filter-checkbox-container__custom-checkbox'
      >
        <div
          className={`filter-checkbox-container__custom-checkbox-switcher ${
            !checkbox
              ? 'filter-checkbox-container__custom-checkbox-switcher_state_off'
              : 'filter-checkbox-container__custom-checkbox-switcher_state_on'
          }`}
        ></div>
      </label>
      <span className='filter-checkbox-container__text'>Короткометражки</span>
    </div>
  );
};

export default FilterCheckbox;

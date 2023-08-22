import './FilterCheckbox.css';

const FilterCheckbox = ({ externalClass, onChangeCheckbox, checkboxState }) => {
  const changeChekboxHandler = (e) => {
    const checkboxState = e.target.checked;
    onChangeCheckbox(checkboxState);
  };

  return (
    <div className={`filter-checkbox-container ${externalClass}`}>
      <input
        checked={checkboxState}
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
            !checkboxState
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

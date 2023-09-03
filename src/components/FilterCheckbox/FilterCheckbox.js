import './FilterCheckbox.css';

const FilterCheckbox = ({
  externalClass,
  onChangeRequestData,
  searchRequestData,
  onSubmit,
  setShowMessage,
}) => {

  const changeChekboxHandler = (e) => {
    if (searchRequestData.inputValue === '') {
      setShowMessage(true);
      return;
    } else {
      setShowMessage(false);
      const checkboxState = e.target.checked;
      onChangeRequestData({
        ...searchRequestData,
        checkboxState: checkboxState,
      });
      onSubmit(checkboxState);
    }
  };

  return (
    <div className={`filter-checkbox-container ${externalClass}`}>
      <input
        checked={searchRequestData.checkboxState}
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
            !searchRequestData.checkboxState
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

import './SearchForm.css';
import { FilterCheckbox } from '../';
import { useState } from 'react';

const SearchForm = ({
  onSubmit,
  onChangeCheckbox,
  checkboxState,
  inputValue,
  onChangeInputValue,
}) => {
  // if value is not passed, show message
  const [showMessage, setShowMessage] = useState(false);

  // submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    if (!inputValue) {
      setShowMessage(true);
      return;
    } else {
      setShowMessage(false);
      onSubmit(inputValue);
    }
  };

  // input change handler
  const changeHandler = (e) => {
    const value = e.target.value;
    onChangeInputValue(value);
  };

  return (
    <form
      className='search-form-container'
      onSubmit={(e) => {
        submitHandler(e);
      }}
    >
      <span className='search-form-container__input-message'>
        {showMessage ? 'Нужно ввести ключевое слово' : ''}
      </span>
      <div className='search-form-container__search-panel'>
        <div className='search-form-container__input-panel'>
          <label
            htmlFor='search-input'
            className='search-form-container__input-icon'
          />
          <input
            id='search-input'
            type='text'
            placeholder='Фильм'
            value={inputValue}
            className='search-form-container__input'
            onInput={(e) => {
              changeHandler(e);
            }}
          />

          <button className='search-form-container__button' />
        </div>
        <FilterCheckbox
          checkboxState={checkboxState}
          onChangeCheckbox={onChangeCheckbox}
          externalClass={'search-form-container__checkbox'}
        />
      </div>
      <hr className='search-form-container__bottom-border' />
    </form>
  );
};

export default SearchForm;

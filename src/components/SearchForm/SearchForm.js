import './SearchForm.css';
import { FilterCheckbox } from '../';
import { useEffect, useState } from 'react';

const SearchForm = ({ onSubmit, searchRequestData }) => {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const { inputValue } = searchRequestData;
    setInputValue(inputValue);
  }, [searchRequestData]);

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
      onSubmit({ inputValue: inputValue });
    }
  };

  // input change handler
  const changeHandler = (e) => {
    const value = e.target.value;
    setInputValue(value);
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
          searchRequestData={searchRequestData}
          onChangeCheckbox={onSubmit}
          externalClass={'search-form-container__checkbox'}
        />
      </div>
      <hr className='search-form-container__bottom-border' />
    </form>
  );
};

export default SearchForm;

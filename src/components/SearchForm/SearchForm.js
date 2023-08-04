import './SearchForm.css';
import { FilterCheckbox } from '../';

const SearchForm = () => {
  return (
    <form className='search-form-container'>
      <div className='search-form-container__panel'>
        <div className='search-form-container__input-block'>
          <label htmlFor='search-input' className='search-form-container__input-icon' />
          <input id='search-input' type='text' placeholder='Фильм' className='search-form-container__input'/>
        </div>
        <button className='search-form-container__button' />
        <FilterCheckbox externalClass={'search-form-container__checkbox'} />
      </div>
      <hr className='search-form-container__bottom-border' />
    </form>
  );
};

export default SearchForm;

import "./SearchForm.css";
import { FilterCheckbox } from "../";

const SearchForm = () => {
  return (
    <form className="search-form-container">
      <div className="search-form-container__search-panel">
        <div className="search-form-container__input-panel">
          <label
            htmlFor="search-input"
            className="search-form-container__input-icon"
          />
          <input
            id="search-input"
            type="text"
            placeholder="Фильм"
            className="search-form-container__input"
          />
          <button className="search-form-container__button" />
        </div>
        <FilterCheckbox externalClass={"search-form-container__checkbox"} />
      </div>

      <hr className="search-form-container__bottom-border" />
    </form>
  );
};

export default SearchForm;

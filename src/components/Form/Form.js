import './Form.css';
import { Link } from 'react-router-dom';

const Form = ({
  children,
  type,
  handleSubmit,
  additionalLink,
  isFormValid,
  className,
  isFetched
}) => {
  // sumbitHandler
  const submitHandler = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form
      onSubmit={(e) => {
        submitHandler(e);
      }}
      className={`form-container ${className.form}`}
    >
      {children}
      <button
        type='sumbit'
        disabled={!isFormValid || isFetched}
        className={`form-container__form-button ${
          (!isFormValid || isFetched) ? 'form-container__form-button_disabled' : ''
        }`}
      >
        {type === 'register' ? 'Зарегистрироваться' : 'Войти'}
      </button>
      <div className='form-container__addition'>
        {type === 'register' ? (
          <>
            <span className='form-container__addition-text'>
              Уже зарегистрированы?
            </span>
            <Link to={additionalLink} className='form-container__addition-link'>
              Войти
            </Link>
          </>
        ) : (
          <>
            <span className='form-container__addition-text'>
              Ещё не зарегистрированы?
            </span>
            <Link to={additionalLink} className='form-container__addition-link'>
              Регистрация
            </Link>
          </>
        )}
      </div>
    </form>
  );
};

export default Form;

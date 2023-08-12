import './Form.css';
import { Link } from 'react-router-dom';

const Form = ({ children, type, submitHandler = null, additionalLink, className }) => {
  return (
    <form className={`form-container ${className.form}`}>
      {children}
      <button className='form-container__form-button'>
        { type === 'register' ? 'Зарегистрироваться' : 'Войти' }
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

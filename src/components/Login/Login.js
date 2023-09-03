import './Login.css';
import logo from '../../images/icons/logo-min.svg';
import { Form } from '../';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { useResponseError } from '../../hooks/useResponseError';
import { useNavigate, useLocation } from 'react-router-dom';
import * as auth from '../../utils/auth';
import { useEffect, useState } from 'react';
import { ERROR_MESSAGE } from '../../utils/data';

const Login = ({ externalClass, onLogin }) => {
  // login form validation
  const { values, handleChange, errors, isValid, setIsValid, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const path = location.pathname;
    if (token && (path === '/signin' || path === '/signup')) {
      navigate('/', { replace: true });
    }
  }, []);

  useEffect(() => {
    const isValid = document.forms[0].checkValidity();
    setIsValid(isValid);
  }, [values]);

  const location = useLocation();
  // navigate
  const navigate = useNavigate();
  // response error
  const { responseError, setResponseError } = useResponseError();
  // disable form input when fetch
  const [ isFetched, setIsFetched ] = useState(false);

  // sumbitHandler
  const submitHandler = () => {
    const form = document.forms[0];
    setIsFetched(true);
    auth
      .login(values)
      .then((res) => {
        if (res.err || res.error) {
          const errorStatusCode = res.err?.statusCode || res.statusCode;

          if (errorStatusCode === 401) {
            throw new Error(res.message);
          } else if (errorStatusCode === 400) {
            throw new Error(ERROR_MESSAGE.loginError);
          }
        } else {
          onLogin(res.token);
          navigate('/movies', { replace: true });
          setIsFetched(false);
        }
      })
      .catch((err) => {
        setResponseError(err.message);
      })
      .finally(() => {
        resetForm();
        form.reset();
        setIsFetched(false);
      });
  };

  return (
    <section className={`login-container ${externalClass}`}>
      <div className='login-container__heading'>
        <Link to='/'>
          <img src={logo} alt='Logo' className='login-container__logo' />
        </Link>
        <h1 className='login-container__title'>Рады видеть!</h1>
      </div>
      <Form
        handleSubmit={submitHandler}
        additionalLink='/signup'
        className={{ form: 'login-container__form' }}
        isFormValid={isValid}
        isFetched={isFetched}
      >
        <ul className='form-container__inputs'>
          <li className='form-container__input-container'>
            <label htmlFor='user-email' className='form-container__label'>
              E-mail
            </label>
            <input
              id='user-email'
              name='email'
              type='text'
              className='form-container__input'
              placeholder='Введите почту'
              pattern='^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$'
              required
              onInput={(e) => {
                handleChange(e);
              }}
              disabled={isFetched ? 'disabled' : ''}
            />
            <span className='form-container__input-error'>
              {errors.email || ''}
            </span>
          </li>
          <li className='form-container__input-container'>
            <label htmlFor='user-password' className='form-container__label'>
              Пароль
            </label>
            <input
              id='user-password'
              name='password'
              type='password'
              minLength='8'
              className='form-container__input'
              placeholder='Введите пароль'
              required
              onInput={(e) => {
                handleChange(e);
              }}
              disabled={isFetched ? 'disabled' : ''}
            />
            <span className='form-container__input-error'>
              {errors.password || ''}
            </span>
          </li>
          <span className='form-container__form-error'>
            {responseError || ''}
          </span>
        </ul>
      </Form>
    </section>
  );
};

export default Login;

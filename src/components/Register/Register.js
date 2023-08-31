import './Register.css';
import logo from '../../images/icons/logo-min.svg';
import { Form } from '../';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { useResponseError } from '../../hooks/useResponseError';
import * as auth from '../../utils/auth';
import { useEffect, useState } from 'react';
import { ERROR_MESSAGE } from '../../utils/data';

const Register = ({ externalClass, onLogin }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    const path = location.pathname;
    if (token && (path === '/signin' || path === '/signup')) {
      navigate('/', { replace: true });
    }
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  // register form validation
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  // response error
  const { responseError, setResponseError } = useResponseError();
  // disable form input when fetch
  const [ isFetched, setIsFetched ] = useState(false);

  // sumbitHandler
  const submitHandler = () => {
    const form = document.forms[0];
    setIsFetched(true);
    auth
      .register(values)
      .then((res) => {
        if (res.err || res.error) {
          const errorStatusCode = res.err?.statusCode || res.statusCode;

          if (errorStatusCode === 401) {
            throw new Error(res.message);
          } else if (errorStatusCode === 400) {
            throw new Error(ERROR_MESSAGE.registerError);
          } else if (errorStatusCode === 409) {
            throw new Error(ERROR_MESSAGE.conflictError);
          }
        } else {
          const { email } = res;
          const { password } = values;
          auth.login({ email, password }).then(({ token }) => {
            onLogin(token);
            setIsFetched(false);
          });
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
    <section className={`register-container ${externalClass}`}>
      <div className='register-container__heading'>
        <Link to='/'>
          <img src={logo} alt='Logo' className='register-container__logo' />
        </Link>
        <h1 className='register-container__title'>Добро пожаловать!</h1>
      </div>
      <Form
        handleSubmit={submitHandler}
        type='register'
        additionalLink='/signin'
        className={{ form: 'register-container__form' }}
        isFormValid={isValid}
        isFetched={isFetched}
      >
        <ul className='form-container__inputs'>
          <li className='form-container__input-container'>
            <label htmlFor='user-name' className='form-container__label'>
              Имя
            </label>
            <input
              id='user-name'
              minLength='2'
              maxLength='30'
              type='text'
              name='name'
              className='form-container__input'
              placeholder='Введите имя'
              required
              onInput={(e) => {
                handleChange(e);
              }}
              disabled={isFetched ? 'disabled' : ''}
            />
            <span className='form-container__input-error'>
              {errors.name || ''}
            </span>
          </li>
          <li className='form-container__input-container'>
            <label htmlFor='user-email' className='form-container__label'>
              E-mail
            </label>
            <input
              id='user-email'
              name='email'
              type='email'
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
        </ul>
        <span className='form-container__form-error'>
          {responseError || ''}
        </span>
      </Form>
    </section>
  );
};

export default Register;

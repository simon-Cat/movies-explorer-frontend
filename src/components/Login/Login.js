import './Login.css';
import logo from '../../images/icons/logo-min.svg';
import { Form } from '../';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { useResponseError } from '../../hooks/useResponseError';
import { useNavigate, useLocation } from 'react-router-dom';
import * as auth from '../../utils/auth';
import { useEffect } from 'react';
import { ERROR_MESSAGE } from '../../utils/data';

const Login = ({ externalClass, onLogin }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    const path = location.pathname;
    if (token && (path === '/signin' || path === '/signup')) {
      navigate('/', { replace: true });
    }
  }, []);

  const location = useLocation();
  // navigate
  const navigate = useNavigate();
  // login form validation
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  // response error
  const { responseError, setResponseError } = useResponseError();

  // sumbitHandler
  const submitHandler = () => {
    const form = document.forms[0];
    auth
      .login(values)
      .then((res) => {
        console.log('asdasdasdasd');
        // if (res.err || res.error) {
        //   return Promise.reject(res);
        // }
        onLogin(res.token);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        if (err.error === 'Bad Request') {
          const message = ERROR_MESSAGE.loginError;
          setResponseError(message);
          return;
        }
        setResponseError(err.message);
      })
      .finally(() => {
        resetForm();
        form.reset();
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

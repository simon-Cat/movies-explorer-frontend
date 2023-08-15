import './Register.css';
import logo from '../../images/icons/logo-min.svg';
import { Form } from '../';
import { Link } from 'react-router-dom';
import * as mainApi from '../../utils/MainApi';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { useResponseError } from '../../hooks/useResponseError';
import { useNavigate } from 'react-router-dom';

const Register = ({ externalClass }) => {
  // navigate
  const navigate = useNavigate();
  // register form validation
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  // response error
  const { responseError, setResponseError } = useResponseError();

  // sumbitHandler
  const submitHandler = () => {
    mainApi
      .register(values)
      .then((res) => {
        if (res.err) {
          return Promise.reject(res);
        }
        navigate('/signin', { replace: true });
      })
      .catch((e) => {
        setResponseError(e);
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
            />
            <span className='form-container__input-error'>{errors.name || ''}</span>
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
              required
              onInput={(e) => {
                handleChange(e);
              }}
            />
            <span className='form-container__input-error'>{errors.email || ''}</span>
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
        </ul>
        <span className='form-container__form-error'>{responseError || ''}</span>
      </Form>
    </section>
  );
};

export default Register;

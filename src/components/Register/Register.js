import './Register.css';
import logo from '../../images/icons/logo-min.svg';
import { Form } from '../';
import { Link } from 'react-router-dom';

const Register = ({ externalClass }) => {
  return (
    <section className={`register-container ${externalClass}`}>
      <div className='register-container__heading'>
        <Link to='/'><img src={logo} alt='Logo' className='register-container__logo' /></Link>
        <h1 className='register-container__title'>Добро пожаловать!</h1>
      </div>
      <Form type='register' additionalLink='/signin' className={{ form: 'register-container__form' }}>
        <div className='form-container__inputs'>
          <div className='form-container__input-container'>
            <label htmlFor='user-name' className='form-container__label'>
              Имя
            </label>
            <input
              id='user-name'
              type='text'
              className='form-container__input'
              placeholder='Введите имя'
            />
          </div>
          <div className='form-container__input-container'>
            <label htmlFor='user-email' className='form-container__label'>
              E-mail
            </label>
            <input
              id='user-email'
              type='email'
              className='form-container__input'
              placeholder='Введите почту'
            />
          </div>
          <div className='form-container__input-container'>
            <label
              htmlFor='user-password'
              className='form-container__label'
            >
              Пароль
            </label>
            <input
              id='user-password'
              type='password'
              className='form-container__input'
              placeholder='Введите пароль'
            />
          </div>
        </div>
        <span className='form-container__input-error' />
      </Form>
    </section>
  );
};

export default Register;

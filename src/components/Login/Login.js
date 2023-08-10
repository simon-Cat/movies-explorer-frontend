import './Login.css';
import logo from '../../images/icons/logo-min.svg';
import { Form } from '../';
import { Link } from 'react-router-dom';

const Login = ({ externalClass }) => {
  return (
    <section className={`login-container ${externalClass}`}>
      <div className='login-container__heading'>
        <Link to='/'>
          <img src={logo} alt='Logo' className='login-container__logo' />
        </Link>
        <h1 className='login-container__title'>Рады видеть!</h1>
      </div>
      <Form
        additionalLink='/signup'
        className={{ form: 'login-container__form' }}
      >
        <ul className='form-container__inputs'>
          <li className='form-container__input-container'>
            <label htmlFor='user-email' className='form-container__label'>
              E-mail
            </label>
            <input
              id='user-email'
              type='email'
              className='form-container__input'
              placeholder='Введите почту'
            />
          </li>
          <li className='form-container__input-container'>
            <label htmlFor='user-password' className='form-container__label'>
              Пароль
            </label>
            <input
              id='user-password'
              type='password'
              className='form-container__input'
              placeholder='Введите пароль'
            />
          </li>
          <span className='form-container__input-error form-container__input-error_page_login' />
        </ul>
      </Form>
    </section>
  );
};

export default Login;

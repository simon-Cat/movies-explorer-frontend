import './Profile.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { useResponseError } from '../../hooks/useResponseError';
import mainApi from '../../utils/MainApi';

const Profile = ({ extrenalClass, onSignOut, onUpdateProfile }) => {
  // context
  const currentUser = useContext(CurrentUserContext);

  // profile form validation
  const { values, setValues, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  // response error
  const { responseError, setResponseError } = useResponseError();

  // success update profile message
  const [successUpdateMessage, setSuccessUpdateMessage] = useState('');

  // is same user data
  const [ isSameUserData, setIsSameUserData ] = useState(true);

  useEffect(() => {
    setValues({
      ...values,
      name: currentUser.name || '',
      email: currentUser.email || '',
    });
  }, [currentUser]);

  const singOutHandler = () => {
    onSignOut();
  };

   // change input handler
   const onChangeInputHandler = (e) => {
    const inputname = e.target.name;
    const inputValue = e.target.value;
    const { name, email } = values;

    if (inputname === 'name') {
      const emailValue = email;
      if (inputValue === currentUser.name && emailValue === currentUser.email) {
        setIsSameUserData(true);
      } else {
        setIsSameUserData(false);
      }
    } else {
      const nameValue = name;
      if (inputValue === currentUser.email && nameValue === currentUser.name) {
        setIsSameUserData(true);
      } else {
        setIsSameUserData(false);
      }
    }
    handleChange(e);
  }

  // sumbitHandler
  const submitHandler = (e) => {
    e.preventDefault();

    mainApi
      .updateProfileInfo(values, {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      })
      .then((res) => {
        if (res.err) {
          return Promise.reject(res);
        }
        onUpdateProfile(values);
        setSuccessUpdateMessage('Данные успешно обновлены');
      })
      .catch((err) => {
        setResponseError(err.message);
      })
      .finally(() => {
        resetForm();
      });
  };

  return (
    <section className={`profile-container ${extrenalClass}`}>
      <h2 className='profile-container__title'>Привет, {currentUser.name}!</h2>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        name='profile-form'
        className='profile-container__form'
      >
        <ul className='profile-container__inputs-container'>
          <li className='profile-container__input-container'>
            <div className='profile-container__wrapper'>
            <label
              htmlFor='profile-name'
              className='profile-container__input-label'
            >
              Имя
            </label>
            <input
              id='profile-name'
              minLength='2'
              maxLength='30'
              type='text'
              value={values.name}
              onInput={(e) => {
                onChangeInputHandler(e);
              }}
              required
              name='name'
              className='profile-container__input'
              placeholder='Введите имя'
            />
            </div>
            <span className='profile-container__input-error'>
              {errors.name || ''}
            </span>
          </li>
          <li className='profile-container__input-container'>
          <div className='profile-container__wrapper'>
            <label
              htmlFor='profile-email'
              className='profile-container__input-label'
            >
              E-mail
            </label>
            <input
              id='profile-email'
              onInput={(e) => {
                onChangeInputHandler(e);
              }}
              name='email'
              value={values.email}
              required
              type='email'
              className='profile-container__input'
              placeholder='Введите email'
            />
            </div>
            <span className='profile-container__input-error'>
              {errors.email || ''}
            </span>
          </li>
        </ul>
        <span className='profile-container__form-error'>
          {responseError || ''}
        </span>
        <span className='profile-container__form-success'>
          {successUpdateMessage || ''}
        </span>
        <button
          className={`profile-container__form-button ${
            (!isValid || isSameUserData) ? 'profile-container__form-button_disabled' : ''
          }`}
        >
          Редактировать
        </button>
        <button
          className='profile-container__form-button profile-container__form-button_type_exit'
          onClick={singOutHandler}
        >
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
};

export default Profile;

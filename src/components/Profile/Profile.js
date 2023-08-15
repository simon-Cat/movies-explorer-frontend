import './Profile.css';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';

const Profile = ({ extrenalClass, onSignOut }) => {

  const curentUser = useContext(CurrentUserContext);
  const [ userInfo, setUserInfo ] = useState({});

  useEffect(() => {
    setUserInfo({...userInfo, name: curentUser.name || '', email: curentUser.email || ''});
  }, [curentUser]);

  const singOutHandler = () => {
    onSignOut();
  };

  return (
    <section className={`profile-container ${extrenalClass}`}>
      <h2 className='profile-container__title'>Привет, {userInfo.name}!</h2>
      <form name='profile-form' className='profile-container__form'>
        <ul className='profile-container__inputs-container'>
          <li className='profile-container__input-container'>
            <label htmlFor='profile-name' className='profile-container__input-label'>Имя</label>
            <input id='profile-name' className='profile-container__input' value={userInfo.name} placeholder='Введите имя' />
          </li>
          <li className='profile-container__input-container'>
            <label htmlFor='profile-email' className='profile-container__input-label'>E-mail</label>
            <input id='profile-email' className='profile-container__input' value={userInfo.email} placeholder='Введите email' />
          </li>
        </ul>

        <button className='profile-container__form-button'>Редактировать</button>
        <button className='profile-container__form-button profile-container__form-button_type_exit' onClick={singOutHandler}>Выйти из аккаунта</button>
      </form>
    </section>
  );
};

export default Profile;

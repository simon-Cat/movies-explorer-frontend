import './Profile.css';

const Profile = ({ extrenalClass, name = 'Bob Marley', email = 'test@ya.ru' }) => {
  return (
    <section className={`profile-container ${extrenalClass}`}>
      <h2 className='profile-container__title'>Привет, {name}!</h2>
      <form name='profile-form' className='profile-container__form'>
        <ul className='profile-container__inputs-container'>
          <li className='profile-container__input-container'>
            <label htmlFor='profile-name' className='profile-container__input-label'>Имя</label>
            <input id='profile-name' className='profile-container__input' placeholder='Введите имя' />
          </li>
          <li className='profile-container__input-container'>
            <label htmlFor='profile-email' className='profile-container__input-label'>E-mail</label>
            <input id='profile-email' className='profile-container__input' placeholder='Введите email' />
          </li>
        </ul>

        <button className='profile-container__form-button'>Редактировать</button>
        <button className='profile-container__form-button profile-container__form-button_type_exit'>Выйти из аккаунта</button>
      </form>
    </section>
  );
};

export default Profile;

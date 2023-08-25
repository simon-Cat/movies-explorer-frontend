import './ServerErrorMessage.css';

const ServerErrorMessage = () => {
  return (
    <section className='server-error-messgae-container'>
      <h2 className='server-error-messgae-container__title'>
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте ещё раз
      </h2>
    </section>
  );
};

export default ServerErrorMessage;

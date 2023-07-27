import './NotFoundPage.css'

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-container__content">
        <h1 className="not-found-container__title">404</h1>
        <p className="not-found-container__description">Страница не найдена</p>
      </div>
      <button className="not-found-container__button">Назад</button>
    </div>
  );
};

export default NotFoundPage;
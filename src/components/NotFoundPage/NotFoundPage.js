import './NotFoundPage.css';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-container">
      <div className="not-found-container__content">
        <h1 className="not-found-container__title">404</h1>
        <p className="not-found-container__description">Страница не найдена</p>
      </div>
      <button onClick={goBack} className="not-found-container__button">Назад</button>
    </div>
  );
};

export default NotFoundPage;
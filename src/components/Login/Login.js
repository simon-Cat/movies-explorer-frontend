import "./Login.css";
import logo from "../../images/icons/logo-min.svg";
import { Form } from "../";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useResponseError } from "../../hooks/useResponseError";
import { useNavigate } from "react-router-dom";
import * as auth from '../../utils/auth';

const Login = ({ externalClass, onLogin }) => {
  // navigate
  const navigate = useNavigate();
  // login form validation
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  // response error
  const { responseError, setResponseError } = useResponseError();

  // sumbitHandler
  const submitHandler = () => {
    auth.login(values)
      .then((res) => {
        if (res.err) {
          return Promise.reject(res);
        }
        onLogin(res.token);
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setResponseError(err.message);
      })
      .finally(() => {
        resetForm();
      })
  };

  return (
    <section className={`login-container ${externalClass}`}>
      <div className="login-container__heading">
        <Link to="/">
          <img src={logo} alt="Logo" className="login-container__logo" />
        </Link>
        <h1 className="login-container__title">Рады видеть!</h1>
      </div>
      <Form
        handleSubmit={submitHandler}
        additionalLink="/signup"
        className={{ form: "login-container__form" }}
        isFormValid={isValid}
      >
        <ul className="form-container__inputs">
          <li className="form-container__input-container">
            <label htmlFor="user-email" className="form-container__label">
              E-mail
            </label>
            <input
              id="user-email"
              name="email"
              type="email"
              className="form-container__input"
              placeholder="Введите почту"
              required
              onInput={(e) => {
                handleChange(e);
              }}
            />
            <span className='form-container__input-error'>{errors.email || ''}</span>
          </li>
          <li className="form-container__input-container">
            <label htmlFor="user-password" className="form-container__label">
              Пароль
            </label>
            <input
              id="user-password"
              name="password"
              type="password"
              minLength="8"
              className="form-container__input"
              placeholder="Введите пароль"
              required
              onInput={(e) => {
                handleChange(e);
              }}
            />
            <span className='form-container__input-error'>
              {errors.password || ''}
            </span>
          </li>
          <span className='form-container__form-error'>{responseError || ''}</span>
        </ul>
      </Form>
    </section>
  );
};

export default Login;

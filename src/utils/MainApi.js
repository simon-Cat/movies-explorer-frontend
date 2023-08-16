import { MAIN_API_URL } from './baseUrls';

// API Class
class MainApi {
  constructor({ baseURL }) {
    this.url = baseURL;
  }

  // проверить статус запроса
  _checkResponseStatus(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject('Ошибка запроса!');
    }
  }

  // получить данные пользователя
  getUserInfo(headers) {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: headers,
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  // обновить данные порфиля
  updateProfileInfo({ name, email }, headers) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify({ name, email }),
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }
}

const mainApi = new MainApi({
  baseURL: MAIN_API_URL,
});

export default mainApi;

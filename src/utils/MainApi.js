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
      if (response.status === 409) {
        return Promise.reject('Пользователь с таким email уже существует');
      } else {
        return Promise.reject('Ошибка запроса!');
      }
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

  // get savde movies
  getSavedMovies(headers) {
    return fetch(`${MAIN_API_URL}/movies`, {
      method: 'GET',
      headers: headers,
    }).then((res) => {
      return this._checkResponseStatus(res);
    })
  }

  // add movies into favorites
  addFavoriteMovie(favoriteMovie, headers) {
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(favoriteMovie),
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }

  // remove movies from favorites
  removeFavoriteMovie(favoriteMovieID, headers) {
    return fetch(`${this.url}/movies/${favoriteMovieID}`, {
      method: 'DELETE',
      headers: headers,
    }).then((res) => {
      return this._checkResponseStatus(res);
    });
  }
}

const mainApi = new MainApi({
  baseURL: MAIN_API_URL,
});

export default mainApi;

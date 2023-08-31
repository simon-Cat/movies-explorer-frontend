import { MAIN_API_URL } from '../utils/baseUrls';
import { ERROR_MESSAGE } from './data';

// rigister
export const register = ({ name, email, password }) => {
  return fetch(`${MAIN_API_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw new Error(ERROR_MESSAGE.serverError);
    });
};

// login
export const login = ({ email, password }) => {
  return fetch(`${MAIN_API_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw new Error(ERROR_MESSAGE.serverError);
    });
};

// get content
export const getContent = (token) => {
  return fetch(`${MAIN_API_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      throw new Error(ERROR_MESSAGE.serverError);
    });
};

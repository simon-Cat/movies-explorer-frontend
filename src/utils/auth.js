import { MAIN_API_URL } from '../utils/baseUrls';

// rigister
export const register = ({ name, email, password }) => {
  return fetch(`${MAIN_API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => {
      return res.json();
    })
};

// login
export const login = ({ email, password }) => {
  return fetch(`${MAIN_API_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then((res) => {
    return res.json();
  });
};



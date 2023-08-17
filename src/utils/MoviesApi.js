import { MOVIES_API_URL } from './baseUrls';

export const getMovies = () => {
  return fetch(`${MOVIES_API_URL}`)
    .then((res) => {
      return res.json();
    })
};
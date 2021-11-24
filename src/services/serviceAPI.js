const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '6f7abc44fc4837d6e8737cb8523ac04e';
export const IMG_URL = 'https://image.tmdb.org/t/p/w342';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);

  return response.status === 200
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchPopular({ period }) {
  return fetchWithErrorHandling(
    `${BASE_URL}trending/all/${period}?api_key=${KEY}`,
  );
}

export function fetchMovieByQuery({ query }) {
  return fetchWithErrorHandling(
    `${BASE_URL}search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${query}`,
  );
}

export function fetchMovieById({ movieId }) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${movieId}?api_key=${KEY}&language=en-US`,
  );
}

export function fetchMovieCast({ movieId }) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${movieId}/credits?api_key=${KEY}&language=en-US`,
  );
}

export function fetchMovieReviews({ movieId }) {
  return fetchWithErrorHandling(
    `${BASE_URL}movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`,
  );
}

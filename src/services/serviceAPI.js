const BASE_URL = 'https://api.themoviedb.org/3/';
const KEY = '6f7abc44fc4837d6e8737cb8523ac04e';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchPopular() {
  return fetchWithErrorHandling(`${BASE_URL}trending/all/day?api_key=${KEY}`);
}

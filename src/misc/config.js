const API_BASE_URL = 'https://api.tvmaze.com/';

export async function apiGet(queryString) {
  const reponse = await fetch(`${API_BASE_URL}${queryString}`).then(r =>
    r.json()
  );

  // eslint-disable-next-line
  return reponse;
}
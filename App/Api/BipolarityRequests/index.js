import client from '../client';

export function getAll() {
  return client
    .get('/bipolarities')
    .then(({ data }) => data);
}

export function getById(crId) {
  return client
    .get(`/bipolarities/${crId}`)
    .then(({ data }) => data);
}

export function updateHasBeenAccepted(crId) {
  return client
    .put(`/bipolarities/${crId}/hasBeenAccepted`);
}

export function create(payload) {
  return client
    .post('/bipolarities', payload)
    .then(({ data }) => data);
}

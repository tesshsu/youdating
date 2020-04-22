import client from '../client';

export function getAll() {
  return client
    .get('/compatibilityRequests')
    .then(({ data }) => data);
}

export function getById(crId) {
  return client
    .get(`/compatibilityRequests/${crId}`)
    .then(({ data }) => data);
}

export function updateHasBeenAccepted(crId) {
  return client
    .put(`/compatibilityRequests/${crId}/hasBeenAccepted`);
}

export function create(payload) {
  return client
    .post('/compatibilityRequests', payload)
    .then(({ data }) => data);
}

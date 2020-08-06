import client from '../client';

export function get(params) {
  return client
    .get('/bipolarities', { params })
    .then(({ data }) => data);
}

export function update(payload) {
  return client
    .patch('/bipolarities', payload);
}

export function create(payload) {
  return client
    .post('/bipolarities', payload)
    .then(({ data }) => data);
}

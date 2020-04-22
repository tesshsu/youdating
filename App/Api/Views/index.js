import client from '../client';

export function create(payload) {
  return client
    .post('/views', payload)
    .then(({ data }) => data);
}

export function get() {
  return client
    .get('/views')
    .then(({ data }) => data);
}

import client from '../client';

export function create(payload) {
  return client
    .post('/goodFeelings', payload)
    .then(({ data }) => data);
}

export function get() {
  return client
    .get('/goodFeelings')
    .then(({ data }) => data);
}

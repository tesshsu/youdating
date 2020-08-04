import client from '../client';

export function getAll(params) {
  return client
    .get('/bipolarities', { params })
    .then(({ data }) => data);
}

export function getById(bpId) {
  return client
    .get(`/bipolarities/${bpId}`)
    .then(({ data }) => data);
}

export function update(payload) {
  return client
    .put('/bipolarities', payload)
    .then(({ data }) => data);
}

export function create(payload) {
console.log(payload);
  return client
    .post('/bipolarities', payload)
    .then(({ data }) => data);
}

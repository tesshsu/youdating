import client from '../client';

export function getById(id) {
  return client
    .get(`conversations/${id}`)
    .then(({ data }) => data);
}

export function getAll(params) {
  return client
    .get('conversations', { params })
    .then(({ data }) => data);
}

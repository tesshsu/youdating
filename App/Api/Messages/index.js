import client from '../client';

export function fetchMessages(params) {
  return client
    .get('messages', { params })
    .then(({ data }) => data);
}

export function createMessage(payload) {
  return client.post('messages', payload)
    .then(({ data }) => data);
}

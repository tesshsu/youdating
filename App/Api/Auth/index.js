import client from '../client';

export function signUp(payload) {
  return client.post('auth/signUp', payload)
    .then(({ data }) => data);
}

export function signIn({ email, password }) {
  return client.post('auth/signIn', { email, password })
    .then(({ data }) => data);
}

export function signInWithFacebook(payload) {
  return client.post('auth/signInWithFacebook', payload)
    .then(({ data }) => data);
}

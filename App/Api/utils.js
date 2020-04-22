/* eslint-disable no-undef */
export const createFormData = payload => Object.keys(payload).reduce((acc, curr) => {
  acc.append(curr, payload[curr]);

  return acc;
}, new FormData());

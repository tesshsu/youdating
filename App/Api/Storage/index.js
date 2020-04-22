/* eslint-disable import/prefer-default-export */
import client from '../client';

export function getPresignedUrl(fileName) {
  return client.get('storage/getPresignedUrl', {
    params: {
      fileName
    }
  }).then(({ data }) => data);
}

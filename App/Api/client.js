import axios from 'axios';
import { AsyncStorage, Alert } from 'react-native';
import env from '../environment';

const client = axios.create({
  baseURL: env.API_URL,
  timeout: 10000
});

export function setupApiClient() {
  client.interceptors.request.use(async (config) => {
    const newConfig = config;
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');

    if (token) {
      newConfig.headers.authorization = `Bearer ${token}`;
    }

    return newConfig;
  }, (err) => {
    if (!err.response) {
      Alert.alert('Erreur', 'Pas de réseau !');
    }

    return Promise.reject(err);
  });
}


export default client;

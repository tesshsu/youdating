import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import { AsyncStorage } from 'react-native';

import { persistCombineReducers } from 'redux-persist';

import * as reducers from './reducers';

const config = {
  key: 'primary',
  storage: AsyncStorage,
  blacklist: [
    'modals',
    'uploads',
    'galleryPhotos',
    'loadingOverlay',
    'notifications',
    'met',
    'activeConversation',
    'conversations',
  ],
  timeout: 0,
};

const Store = createStore(
  persistCombineReducers(config, reducers),
  applyMiddleware(
    thunk,
    reduxPromise
  )
);

export default Store;

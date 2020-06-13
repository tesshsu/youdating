import React from 'react';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';

import Yous from './App/App';

Sentry.init({
  dsn: 'https://b49d347f5c5e465fa0ff9c47b27363aa@sentry.io/5186180',
  enableNative: true,
  enableInExpoDevelopment: true,
  debug: true
});

Sentry.setRelease(Constants.manifest.revisionId);

export default function App() {
  return (
    <Yous />
  );
}
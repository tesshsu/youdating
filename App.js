import React from 'react';
import * as Sentry from 'sentry-expo';
import Constants from 'expo-constants';

import Yous from './App/App';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);

Sentry.init({
  dsn: 'https://b49d347f5c5e465fa0ff9c47b27363aa@sentry.io/5186180',
  enableNative: true,
  enableInExpoDevelopment: true,
  debug: true
});

//Sentry.setRelease(Constants.manifest.revisionId);

export default function App() {
  return (
    <Yous />
  );
}

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { AppLoading } from 'expo';
import { Audio } from 'expo-av';
import * as Font from 'expo-font';
import * as Facebook from 'expo-facebook';
import moment from 'moment';
import 'moment/locale/fr';

import ENV from './environment';
import Store from './Redux/Store';
import RootContainer from './RootContainer';
import MoodSelectorModal from './Modules/Global/Modals/MoodSelectorModal';
import { setupApiClient } from './Api/client';
import LoadingOverlay from './Modules/Global/LoadingOverlay';
import QuerySelectorModal from './Modules/Global/Modals/QuerySelectorModal';
import TagSelectorModal from './Modules/Global/Modals/TagSelectorModal';
import AppNotifications from './Modules/Global/Notifications';

const FONT_GADUGI_BOLD = require('../assets/fonts/Gadugi-Bold.ttf');
const FONT_NEW_TAI_LUE_REGULAR = require('../assets/fonts/New-Tai-Lue-Regular.ttf');
const FONT_NEW_TAI_LUE_BOLD = require('../assets/fonts/New-Tai-Lue-Bold.ttf');
const SEGOE_UI_REGULAR = require('../assets/fonts/Segoe-UI.ttf');
const SEGOE_UI_BOLD = require('../assets/fonts/Segoe-UI-Bold.ttf');

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function capitalize() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

moment.locale('fr');
setupApiClient();

function initStore() {
  return persistStore(Store, null).purge();
}

function initFonts() {
  return Font.loadAsync({
    'Gadugi-Bold': FONT_GADUGI_BOLD,
    'NewTaiLue-Regular': FONT_NEW_TAI_LUE_REGULAR,
    'NewTaiLue-Bold': FONT_NEW_TAI_LUE_BOLD,
    'Segoe-UI-Regular': SEGOE_UI_REGULAR,
    'Segoe-UI-Bold': SEGOE_UI_BOLD
  });
}

function initFacebook() {
  return Facebook.initializeAsync(
    ENV.FACEBOOK_APP_ID,
    ENV.FACEBOOK_APP_NAME
  );
}

function initAudio() {
  return Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    allowsRecordingIOS: true,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    shouldDuckAndroid: true
  });
}

async function initApp() {
  await initFonts();
  await initStore();
  await initFacebook();
  await initAudio();
}

export default function Yous() {
  const [appIsReady, setAppIsReady] = useState(false);

  if (appIsReady) {
    return (
      <Provider store={Store}>
        <MoodSelectorModal />
        <QuerySelectorModal />
        <TagSelectorModal />
        <LoadingOverlay />
        <AppNotifications />
        <RootContainer />
      </Provider>
    );
  }

  return (
    <AppLoading
      startAsync={initApp}
      onFinish={() => setAppIsReady(true)}
      onError={console.warn}
    />
  );
}

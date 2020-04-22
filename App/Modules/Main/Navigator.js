import React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Tabs from './Tabs/Navigator';
import PhotosGallerie from './PhotosGallerie';
import TchatNewMessage from './TchatNewMessage';
import TchatConversation from './TchatConversation/Navigator';
import CompatibilityDetails from './CompatibilityDetails';
import GlobalSettings from './GlobalSettings';
import MoodSettings from './MoodSettings';
import VisitedProfil from './VisitedProfil';
import NotificationsListener from './NoificationsListener';

const Navigator = createSharedElementStackNavigator({
  MainTabs: Tabs,
  MainPhotosGallerie: PhotosGallerie,
  MainTchatNewMessage: TchatNewMessage,
  MainTchatConversation: TchatConversation,
  MainCompatibilityDetails: CompatibilityDetails,
  MainGlobalSettings: GlobalSettings,
  MainMoodSettings: MoodSettings,
  MainVisitedProfil: VisitedProfil
}, {
  mode: 'card',
  initialRouteName: 'MainTabs',
  headerMode: 'none',
  defaultNavigationOptions: {
    gestureEnabled: true,
    cardStyle: {
      backgroundColor: 'transparent'
    }
  }
});

export default function MainNavigator({ ...props }) {
  return (
    <>
      <NotificationsListener />
      <Navigator {...props} />
    </>
  );
}

MainNavigator.router = Navigator.router;
MainNavigator.navigationOptions = Navigator.navigationOptions;

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Messages from './Messages';
import Bipolarity from './Bipolarity';
import BipolarityHistoric from './BipolarityHistoric';

export default createSharedElementStackNavigator({
  MainTchatConversationMessages: Messages,
  MainTchatConversationBipolarity: Bipolarity,
  MainTchatConversationBipolarityHistoric: BipolarityHistoric
}, {
  initialRouteName: 'MainTchatConversationMessages',
  headerMode: 'none',
  mode: 'modal',
  defaultNavigationOptions: {
    gestureEnabled: false,
    // cardStyleInterpolator: ({ current: { progress: opacity } }) => ({ cardStyle: opacity })
  }
});

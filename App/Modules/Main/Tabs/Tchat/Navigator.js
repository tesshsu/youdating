import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import List from './List';
import Bipolarity from '../../TchatConversation/Bipolarity';
import BipolarityHistoric from '../../TchatConversation/BipolarityHistoric';
import MessagesIcon from './MessagesIcon';

export default createStackNavigator({
  MainTabsTchatList: List,
  MainTchatConversationBipolarity: Bipolarity,
  MainTchatConversationBipolarityHistoric: BipolarityHistoric
}, {
  initialRouteName: 'MainTabsTchatList',
  headerMode: 'none',
  navigationOptions: {
    tabBarLabel: 'Messagerie',
    tabBarIcon: ({ tintColor }) => (
      <MessagesIcon tintColor={tintColor} />
    )
  }
});

import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import List from './List';
import MessagesIcon from './MessagesIcon';

export default createStackNavigator({
  MainTabsTchatList: List,
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

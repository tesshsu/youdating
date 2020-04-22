import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBar from './TabBar';
import Met from './Met';
import Tchat from './Tchat/Navigator';
import YousAttract from './YousAttract/Navigator';
import Compatibility from './Compatibility';
import Profile from './Profil/Navigator';

export default createBottomTabNavigator({
  MainTabsMet: Met,
  MainTabsTchat: Tchat,
  MainTabsYousAttract: YousAttract,
  MainTabsCompatibility: Compatibility,
  MainTabsProfile: Profile,
}, {
  initialRouteName: 'MainTabsMet',
  tabBarComponent: props => (<TabBar {...props} />),
});

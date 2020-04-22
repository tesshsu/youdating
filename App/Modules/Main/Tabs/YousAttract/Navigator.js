import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { FontAwesome5 } from '@expo/vector-icons';

import Home from './Home';
import Results from './Results';
import PerfectMatch from './PerfectMatch';
import { scale } from '../../../../Helpers/ScaleHelper';

export default createStackNavigator({
  MainTabsYousAttractHome: Home,
  MainTabsYousAttractResults: Results,
  MainTabsYousAttractPerfectMatch: PerfectMatch
}, {
  initialRouteName: 'MainTabsYousAttractHome',
  headerMode: 'none',
  navigationOptions: {
    tabBarLabel: 'You\'s Attract',
    tabBarIcon: ({ tintColor }) => (
      <FontAwesome5 name="yahoo" color={tintColor} size={scale(20)} />
    )
  }
});

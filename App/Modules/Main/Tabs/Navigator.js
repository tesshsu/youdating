import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBar from './TabBar';
import Met from './Met';
import Tchat from './Tchat/Navigator';
import YousAttract from './YousAttract/Navigator';
import Compatibility from './Compatibility';
import Profile from './Profil/Navigator';

export default createBottomTabNavigator({
	MainTabsMet: {
	    screen: Met,
	    navigationOptions: ({ navigation }) => ({
	      header: null,
	      tabBarVisible: false,
	    }),
	},
	MainTabsTchat: {
	    screen: Tchat,
	    navigationOptions: ({ navigation }) => ({
	      header: null,
	      tabBarVisible: false,
	    }),
	},
	MainTabsYousAttract: {
	    screen: YousAttract,
	    navigationOptions: ({ navigation }) => ({
	      header: null,
	      tabBarVisible: false,
	    }),
	},
	MainTabsCompatibility: {
	    screen: Compatibility,
	    navigationOptions: ({ navigation }) => ({
	      header: null,
	      tabBarVisible: false,
	    }),
	},
	MainTabsProfile: {
	    screen: Profile,
	    navigationOptions: ({ navigation }) => ({
	      header: null,
	      tabBarVisible: false,
	    }),
	}
}, {
  initialRouteName: 'MainTabsMet',
  tabBarComponent: props => (<TabBar {...props} />),
});

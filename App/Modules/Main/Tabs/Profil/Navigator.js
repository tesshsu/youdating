import React from 'react';
import { Feather } from '@expo/vector-icons';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Home from './Home';
import Search from './Search';
import GoodFeelings from './GoodFeelings';
import Views from './Views';
import Attractions from './Attractions';
import Invite from './Invite';
import EditDescrition from './EditDescription';
import EditAd from './EditAd';
import EditJob from './EditJob';


import { scale } from '../../../../Helpers/ScaleHelper';

export default createSharedElementStackNavigator({
  MainTabsProfilHome: Home,
  MainTabsProfilSearch: Search,
  MainTabsProfilGoodFeelings: GoodFeelings,
  MainTabsProfilViews: Views,
  MainTabsProfilAttractions: Attractions,
  MainTabsProfilInvite: Invite,
  MainTabsEditDescription: EditDescrition,
  MainTabsEditAd: EditAd,
  MainTabsEditJob: EditJob,
}, {
  initialRouteName: 'MainTabsProfilHome',
  headerMode: 'none',
  mode: 'card',
  navigationOptions: {
    tabBarLabel: 'Profil',
    tabBarIcon: ({ tintColor }) => (
      <Feather name="user" color={tintColor} size={scale(20)} />
    ),
    cardStyle: {
      backgroundColor: 'red'
    }
  }
});

import React from 'react';
import { createAppContainer, createSwitchNavigator, } from 'react-navigation';
import AuthentificationNavigator from './Modules/Authentification/Navigator';
import MainNavigator from './Modules/Main/Navigator';
import PostSignupNavigator from './Modules/PostSignUp/Navigator';
import NavigationHelper from './Helpers/NavigationHelper';

const navigator = createSwitchNavigator({
  AuthentificationNavigator,
  PostSignupNavigator,
  MainNavigator,
}, {
  initialRouteName: 'AuthentificationNavigator'
});

const Container = createAppContainer(navigator);

export default function RootContainer() {
  return (
    <Container
      ref={ref => NavigationHelper.setTopLevelNavigator(ref)}
    />
  );
}

import { createStackNavigator } from 'react-navigation-stack';

import SignIn from './SignIn';
import SignUp from './SignUp';

export default createStackNavigator({
  AuthentificationSignIn: SignIn,
  AuthentificationSignUp: SignUp
}, {
  initialRouteName: 'AuthentificationSignIn',
  headerMode: 'none'
});

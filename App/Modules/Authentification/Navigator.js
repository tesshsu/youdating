import { createStackNavigator } from 'react-navigation-stack';

import SignIn from './SignIn';
import ForgetPwd from './SignIn';
import SignUp from './SignUp';


export default createStackNavigator({
  AuthentificationSignIn: SignIn,
  AuthentificationSignUp: SignUp,
  ForgetPassword: ForgetPwd,
}, {
  initialRouteName: 'AuthentificationSignIn',
  headerMode: 'none'
});

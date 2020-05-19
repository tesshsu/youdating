import { createStackNavigator } from 'react-navigation-stack';

import Intro from './Intro';
import Quizz from './Quizz';


export default createStackNavigator({
  PostSignUpIntro: Intro,
  PostSignUpQuizz: Quizz
}, {
  initialRouteName: 'PostSignUpIntro',
  headerMode: 'none'
});

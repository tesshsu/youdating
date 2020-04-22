import { createStackNavigator } from 'react-navigation-stack';

import Intro from './Intro';
import ProfilSetup from './ProfilSetup';
import QuizzIntro from './QuizzIntro';
import Quizz from './Quizz';


export default createStackNavigator({
  PostSignUpIntro: Intro,
  PostSignUpProfilSetup: ProfilSetup,
  PostSignUpQuizz: Quizz,
  PostSignUpQuizzIntro: QuizzIntro
}, {
  initialRouteName: 'PostSignUpIntro',
  headerMode: 'none'
});

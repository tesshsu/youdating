import React from 'react';
import {
  Text, Image, SafeAreaView
} from 'react-native';
import Animated from 'react-native-reanimated';

import styles from './styles';
import RoundButton from '../../Global/RoundButton';
import { scale, verticalScale } from '../../../Helpers/ScaleHelper';
import NavigationHelper from '../../../Helpers/NavigationHelper';

const IMAGE = require('../../../../assets/images/quizz/home.png');

export default function QuizzIntro() {
  return (
    <>
      <Image source={IMAGE} style={styles.image} />
      <Animated.ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.mainTitleText}>TEST DE PERSONNALITÉ</Text>
        <Text style={styles.titleText}>{'Le test est la dernière étape avant d\'utiliser YOU\'S. Le test dure un peu moins de 5 minutes'}</Text>
        <Text style={styles.paragraph}>
          {'Ce test nous permettra de déterminer ta personnalité, ce qui te permettra d\'interagir de la façon la plus adaptée avec les autres utilisateurs.'}
        </Text>
        <Text style={styles.titleText}>
          Réponds aux 16 questions pour découvrir ton profil.
        </Text>
        <Text style={styles.adviceText}>
          CONSEIL
        </Text>
        <Text style={styles.paragraph}>
          {'Aucun profil n\'est meilleur ou pire que l\'autres.\nIls ont chacun leurs forces et leurs faiblesses.\n Nous t\'encourageons donc a être le plus sincère pour une meilleur expérience sur YOU\'S'}
        </Text>
        <Text style={styles.titleText}>
          Merci à toi
        </Text>
      </Animated.ScrollView>
      <RoundButton
        text="BON TEST"
        backgroundColor="#84B5E4"
        width={scale(172)}
        height={verticalScale(50)}
        borderRadius={verticalScale(26)}
        containerStyle={styles.button}
        onPress={() => NavigationHelper.navigate('PostSignUpQuizz')}
      />
      <SafeAreaView />
    </>
  );
}

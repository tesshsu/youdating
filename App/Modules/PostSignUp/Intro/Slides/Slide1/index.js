import React, { useMemo } from 'react';
import {
  Text, Image, View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import Animated from 'react-native-reanimated';
import styles from '../../styles';
import colors from '../../../../../Assets/css';
import { LinearGradient } from 'expo-linear-gradient';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';
import PageHeader from '../../../../Global/PageHeader';
const IMAGE = require('../../../../../../assets/images/quizz/home.png');
const COLOR = '#412EA2';

export default function Slide1() {


  return (
    <>
      <PageHeader
        title=""
        backButton
      />
      <KeyboardAvoidingView style={{ flex: 1 }} contentContainerStyle={styles.container}>

        <Text>
          CHOISIS UN DES 4 MOODS POUR DEMARRER
        </Text>

        <TouchableOpacity
          style={styles.link}
          onPress={() => NavigationHelper.navigate('AuthentificationSignUp')}
        >
          <Text style={styles.linkText}>
            SIGN UP
          </Text>
        </TouchableOpacity>
        <LinearGradient colors={['#E4C56D', '#DA407D', '#D6266E']}
                        style={styles.linearGradient}
                        start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
          <Text style={styles.buttonTextGradient} onPress={() => NavigationHelper.navigate('PostSignUpProfilSetup')}> FAITES LE TEST MAINTENANT </Text>
        </LinearGradient>

      </KeyboardAvoidingView>

    </>
  );
}

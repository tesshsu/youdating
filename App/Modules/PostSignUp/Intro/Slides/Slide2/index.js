import React from 'react';
import {
  Text, Image, View, SafeAreaView
} from 'react-native';
import Animated from 'react-native-reanimated';
import styles from '../../styles';
import colors from '../../../../../Assets/css';
const IMAGE = require('../../../../../../assets/images/quizz/screen1.png');

const COLOR = '#B2499D';

export default function Slide2() {
  return (
    <>
      <Image source={IMAGE} style={styles.image} />
      <Animated.ScrollView style={styles.scrollView}>
        <Text style={[styles.mainTitleText, { color: colors.BLACK }]}>TEST DE PERSONNALITE</Text>
        <Text style={styles.mainSubTitleText}>Le test est la derniere etape avant d'utiliser YOU's,
          Le Test dure un pue moins de 5 minutes
        </Text>
        <Text style={[styles.titleText, { color: colors.GREY }]}>
          {'Ce test nous permettra de dé terminer ta personnalité. Ce qui te permettra d\'interagir de la façon la plus adaptée avec les autres utilisateurs.'}
        </Text>
        <Text style={styles.mainSubTitleText}>Réponds aux questions pour découvrir ton profil
        </Text>
        <Text style={styles.secondTitle}>
          CONSEIL
        </Text>
        <Text style={styles.paragraph}>
          {'Aucun profil n\'est meilleur ou pire que l\'autres, ils ont chacun leurs forces et leurs faiblesses, Nous t\'encourageons donc a etre le plus sincere pour une meilleur experience sur YOU\'S.'}
        </Text>
        <Text style={styles.mainSubTitleText}>
          Merci a toi
        </Text>
      </Animated.ScrollView>
      <View style={styles.dotsContainer}>
        { new Array(5).fill(0).map((v, i) => (
          <View
            key={i.toString()}
            style={[
              styles.dot,
              v === i && { backgroundColor: COLOR }]}
          />
        ))}
      </View>
      <SafeAreaView style={[styles.bar, { backgroundColor: COLOR }]} />
    </>
  );
}

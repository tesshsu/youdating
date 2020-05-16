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
        <Text style={styles.mainSubTitleText}>{'Te sens-tu constamment poussé a exprimer ce que tu penses en public?'}</Text>
        <Text style={[styles.titleText, { color: COLOR }]}>
          {'Le mood parfait pour vous amuser '}
        </Text>
        <Text style={styles.paragraph}>
          Rencontrez de nouvelles personnes et partagez toutes vos passions.
        </Text>
        <Text style={styles.paragraph}>
          {'Sortez et profitez d\'un moment amical avec des gens compatibles.'}
        </Text>
        { /* eslint-disable-next-line max-len */}
        <Text style={styles.paragraph}>Faites progresser vos relations avec succès de la manière la plus adaptée à votre tendance.</Text>
        <Text style={styles.paragraph}>
          <Text style={[styles.yousText, { color: COLOR }]}>{'YOU\'S '}</Text>
          {'vous permet de proposer une activité mais aussi de trouver de nouveaux amis à proximité et dans le même mood que vous. testez YOU\'S et découvrez vos perfects matchs social grâce à la technologie A.L.H.D'}
        </Text>
      </Animated.ScrollView>
      <View style={styles.dotsContainer}>
        { new Array(5).fill(1).map((v, i) => (
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

import React from 'react';
import {
  Text, Image, View, SafeAreaView
} from 'react-native';
import Animated from 'react-native-reanimated';

import styles from '../../styles';

const IMAGE = require('../../../../../../assets/images/intro/slide4.png');

const COLOR = '#6593AB';

export default function Slide4() {
  return (
    <>
      <Image source={IMAGE} style={styles.image} />
      <Animated.ScrollView style={styles.scrollView}>
        <Text style={[styles.mainTitleText, { color: COLOR }]}>MOOD PROFESSIONNEL</Text>
        <Text style={styles.mainSubTitleText}>ELARGISSEZ VOTRE RESEAU</Text>
        <Text style={[styles.titleText, { color: COLOR }]}>
          Le mood parfait pour faire évoluer sa carrière
        </Text>
        <Text style={styles.paragraph}>
          {'Créez de nouveaux contacts et développez votre carnet d\'adresses'}
        </Text>
        <Text style={styles.paragraph}>
          Collaborez et interagissez avec des gens compatibles en toute simplicité
        </Text>
        { /* eslint-disable-next-line max-len */}
        <Text style={styles.paragraph}>
          Faites progresser votre carrière avec succès de la manière la plus adaptée à vos besoins
        </Text>
        <Text style={styles.paragraph}>
          <Text style={[styles.yousText, { color: COLOR }]}>{'YOU\'S '}</Text>
          {'vous permet de chercher du travail mais aussi d\'en proposer à tous les utilisateurs qui sont dans le même mood que vous. Testez YOU\'S et découvrez la collaboration sous un tout nouvel angle grâce à la technologie A.L.H.D'}
        </Text>
      </Animated.ScrollView>
      <View style={styles.dotsContainer}>
        { new Array(5).fill(3).map((v, i) => (
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

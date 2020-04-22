import React from 'react';
import {
  Text, Image, View, SafeAreaView
} from 'react-native';
import Animated from 'react-native-reanimated';

import styles from '../../styles';

const IMAGE = require('../../../../../../assets/images/intro/slide3.png');

const COLOR = '#EB3780';

export default function Slide3() {
  return (
    <>
      <Image source={IMAGE} style={styles.image} />
      <Animated.ScrollView style={styles.scrollView}>
        <Text style={[styles.mainTitleText, { color: COLOR }]}>MOOD COUPLE</Text>
        <Text style={styles.mainSubTitleText}>TROUVER LE PARTENAIRE IDÉAL</Text>
        <Text style={[styles.titleText, { color: COLOR }]}>
          {'Le mood parfait pour tomber amoureux '}
        </Text>
        <Text style={styles.paragraph}>
          {'Analysez la personnalité des autres prétendants et décider avec qui vous voulez continuer l\'aventure.'}
        </Text>
        <Text style={styles.paragraph}>
          Discutez et rencontrez des célibataires compatibles.
        </Text>
        { /* eslint-disable-next-line max-len */}
        <Text style={styles.paragraph}>
          Faites progresser votre couple avec succès
          de la manière la plus adaptée à vos attentes.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={[styles.yousText, { color: COLOR }]}>{'YOU\'S '}</Text>
          {'vous permet de rencontrer des célibataires a proximité et dans le même mood que vous. Testez YOU\'S et découvrez vos perfects matchs couple grâce à la technologie A.L.H.D.'}
        </Text>
      </Animated.ScrollView>
      <View style={styles.dotsContainer}>
        { new Array(5).fill(2).map((v, i) => (
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

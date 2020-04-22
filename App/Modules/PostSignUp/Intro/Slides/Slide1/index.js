import React from 'react';
import {
  Text, Image, View, SafeAreaView
} from 'react-native';
import Animated from 'react-native-reanimated';

import styles from '../../styles';

const IMAGE = require('../../../../../../assets/images/intro/slide1.png');

const COLOR = '#412EA2';

export default function Slide1() {
  return (
    <>
      <Image source={IMAGE} style={styles.image} />
      <Animated.ScrollView style={styles.scrollView}>
        <Text style={[styles.mainTitleText, { color: COLOR }]}>TECHNOLOGIE A.L.H.D</Text>
        <Text style={styles.mainSubTitleText}>réseau 3.0</Text>
        <Text style={[styles.titleText, { color: COLOR }]}>
          {'Le modèle A.L.H.D est un modèle basé sur des schémas de comportements algorithmiques qui se repètent et qui s\'expriment plus ou moins fortement chez chaque individu. Développer depuis plus d\'une quinzaine d\'années le modèle s\'est perfectionné, il offre 2 avantages majeurs par rapport aux autres modèles déjà existants.'}
        </Text>
        <Text style={styles.paragraph}>
          {'Le modèle A.L.H.D identifie rapidement la tendance majoritaire d\'un profil et son comportement en seulement quelques questions.'}
        </Text>
        <Text style={styles.paragraph}>
          {'Le modèle A.L.H.D peut aussi anticiper la configuration d\'une relation et vous en informer à l\'avance.'}
        </Text>
        <Text style={styles.paragraph}>
          <Text style={[styles.yousText, { color: COLOR }]}>{'YOU\'S '}</Text>
          {'se sert d\'une technologie totalement nouvelle et révolutionnaire pour vous aider a mieux connaître votre personnalité et à mieux comprendre vos intéractions avec le monde entier.'}
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

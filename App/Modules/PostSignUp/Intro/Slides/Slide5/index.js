import React from 'react';
import {
  Text, Image, View, SafeAreaView
} from 'react-native';
import Animated from 'react-native-reanimated';

import styles from '../../styles';
import RoundButton from '../../../../Global/RoundButton';
import { scale, verticalScale } from '../../../../../Helpers/ScaleHelper';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';

const IMAGE = require('../../../../../../assets/images/intro/slide5.png');

const COLOR = '#F1BB6D';

export default function Slide5() {
  return (
    <>
      <Image source={IMAGE} style={styles.image} />
      <Animated.ScrollView style={styles.scrollView}>
        <Text style={[styles.mainTitleText, { color: COLOR }]}>MOOD PERSONNEL</Text>
        <Text style={styles.mainSubTitleText}>DECOUVREZ VOTRE COMPATIBILITE AVEC VOS PROCHES</Text>
        <Text style={[styles.titleText, { color: COLOR }]}>
          Le mood parfait pour optimiser sa vie
        </Text>
        <Text style={styles.paragraph}>
          {'Invitez vos contacts et découvrez votre niveau de compatibilité dans l\'un des moods souhaités.'}
        </Text>
        <Text style={styles.paragraph}>
          Découvrez les goûts et les intérêts de vos connaissances, de vos amis et même de votre famille.
        </Text>
        { /* eslint-disable-next-line max-len */}
        <Text style={styles.paragraph}>
        Faites progresser votre vie avec succès de la manière la plus adaptée à votre personnalité.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={[styles.yousText, { color: COLOR }]}>{'YOU\'S '}</Text>
          {'vous permet d\'intéragir avec vos proches proches sans être visible par les autres utilisateurs de la plateforme. Testez YOU\'S et changez votre vision sur les gens qui vous entourent grâce à la technologie A.L.H.D'}
        </Text>
      </Animated.ScrollView>
      <RoundButton
        text="REMPLIR VOTRE PROFIL"
        backgroundColor={COLOR}
        width={scale(212)}
        height={verticalScale(30)}
        borderRadius={verticalScale(15)}
        containerStyle={styles.button}
        onPress={() => NavigationHelper.navigate('PostSignUpProfilSetup')}
      />
      <View style={styles.dotsContainer}>
        { new Array(5).fill(4).map((v, i) => (
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

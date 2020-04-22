import React from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';
import { scale, verticalScale } from '../../../../../Helpers/ScaleHelper';
import PageHeader from '../../../../Global/PageHeader';
import MoodSelectorHeaderButton from '../../../../Global/MoodSelectorHeaderButton';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';
import RoundButton from '../../../../Global/RoundButton';
import UtilsHelper from '../../../../../Helpers/UtilsHelper';

const YOUS_ATTRACT_PINK = require('../../../../../../assets/images/yous_attract_pink.png');
const YOUS_ATTRACT_BLUE = require('../../../../../../assets/images/yous_attract_blue.png');
const YOUS_ATTRACT_PURPLE = require('../../../../../../assets/images/yous_attract_purple.png');
const YOUS_ATTRACT_YELLOW = require('../../../../../../assets/images/yous_attract_yellow.png');

const LOGOS = {
  PRO: YOUS_ATTRACT_BLUE,
  LOVE: YOUS_ATTRACT_PINK,
  SOCIAL: YOUS_ATTRACT_PURPLE,
  PERSO: YOUS_ATTRACT_YELLOW
};

export default function MainTabsYousAttract() {
  const {
    moodInfos,
    currentMood
  } = useCurrentMood();

  const onYousAttractPress = UtilsHelper.createTapper({
    single: () => {
      NavigationHelper.navigate('MainTabsYousAttractPerfectMatch');
    },
    double: () => {
      NavigationHelper.navigate('MainTabsYousAttractResults');
    },
  });


  return (
    <>
      <PageHeader
        title="Géolocalisation"
        leftComponent={() => (
          <MoodSelectorHeaderButton
            moods={['PRO', 'LOVE', 'SOCIAL']}
          />
        )}
        rightComponent={() => (
          <FontAwesome5
            name="sliders-h"
            size={verticalScale(19)}
            color="white"
            onPress={() => NavigationHelper.navigate('MainGlobalSettings')}
          />
        )}
      />
      <LinearGradient
        style={styles.container}
        colors={['#A8A3A3', 'white', '#A8A3A3']}
        start={[0, 0]}
        end={[0, 1]}
      >
        <RoundButton
          text="MES ATTRACTIONS"
          containerStyle={styles.absoluteButton}
          backgroundColor={moodInfos.color}
          borderRadius={verticalScale(6)}
          chevronRight
          onPress={() => NavigationHelper.navigate('MainTabsYousAttractResults')}
        />
        <Text
          style={styles.pressHereText}
        >
          Tapes une fois pour un perfect match
        </Text>
        <Text
          style={styles.pressHereText}
        >
          Tapes deux fois pour géolocaliser toute les personnes autour de toi
        </Text>
        <TouchableOpacity
          onPress={onYousAttractPress}
        >
          <Image
            source={LOGOS[currentMood]}
            style={styles.yousAttractLogo}
          />
        </TouchableOpacity>
        <Text style={styles.yousAttractTitleText}>
          {'You\'s Attract'}
        </Text>
        <Text
          style={[
            styles.moodText,
            { color: moodInfos.color }
          ]}
        >
          {moodInfos.title}
        </Text>
      </LinearGradient>
    </>
  );
}

MainTabsYousAttract.navigationOptions = {
  tabBarLabel: 'You\'s Attract',
  tabBarIcon: ({ tintColor }) => (
    <Feather name="heart" color={tintColor} size={scale(20)} />
  )
};

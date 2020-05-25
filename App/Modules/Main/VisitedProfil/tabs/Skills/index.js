import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import MoodSelector from '../../../../Global/MoodSelector';
import GridView from '../../../../Global/GridView';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import useVisitedProfil from '../../../../../Hooks/useVisitedProfil';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';

const ASSETS = [
  'dynamique',
  'polyvalent',
  'audacieux',
  'créatif',
  'philosophe',
  'ponctuel',
  'souriant',
  'rigoureux',
  'logique',
  'sensible',
  'respectueux',
  'concentré',
  'serviable',
  'généreux',
  'enthousiaste',
  'fidèle',
  'drôle',
  'reservé',
  'cutivé',
  'pétillant'
];

const LIFE_STYLES = [
  'dandy/classe',
  'geek',
  'gothique',
  'street',
  'hipster',
  'sportif',
  'classique',
  'hippie',
  'bcbg',
  'bobo',
  'rockeur',
  'electro',
  'décontracté',
  'teufeur'
];

const ASSETS_CHUNKS = ASSETS.reduce((acc, curr) => {
  if (acc[acc.length - 1].length === ASSETS.length / 4) {
    acc.push([curr]);
  } else {
    acc[acc.length - 1].push(curr);
  }

  return acc;
}, [[]]);

const LIFE_STYLES_CHUNKS = LIFE_STYLES.reduce((acc, curr) => {
  if (acc[acc.length - 1].length === LIFE_STYLES.length / 2) {
    acc.push([curr]);
  } else {
    acc[acc.length - 1].push(curr);
  }

  return acc;
}, [[]]);

export default function Skills() {
  const { moodInfos, currentMood } = useCurrentMood();
  const { profil } = useVisitedProfil();
  const [skills] = useState(() => profil.skills);
  const images = profil.moods[currentMood].photos;
  return (
    <>
      <MoodSelector containerStyle={{ marginBottom: 0 }} />
      <View style={styles.section}>
        <TouchableOpacity
          disabled
          onPress={() => NavigationHelper.navigate('MainTabsEditDescription')}
          style={styles.descriptionContainer}
        >
          <Text style={styles.descriptionText}>{profil.moods[currentMood].description || `${profil.firstName} n'a pas rentré de description`}</Text>
        </TouchableOpacity>
        <GridView
          items={images}
          styles={styles.itemStyle}
        />
      </View>
    </>
  );
}

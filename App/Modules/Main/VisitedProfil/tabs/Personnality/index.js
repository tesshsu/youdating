import React, { useMemo } from 'react';
import { Text } from 'react-native';

import styles from './styles';

import MoodSelector from '../../../../Global/MoodSelector';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import * as PERSONNALITY_DETAILS from '../../../../../PersonnalityDetails';
import useVisitedProfil from '../../../../../Hooks/useVisitedProfil';

export default function Personnality() {
  const { moodInfos, currentMood } = useCurrentMood();
  const { profil: { personalities, gender } } = useVisitedProfil();

  const {
    title,
    content
  } = useMemo(() => PERSONNALITY_DETAILS[currentMood][personalities.main], [currentMood, personalities]);

  return (
    <>
      <MoodSelector />
      <Text
        style={[
          styles.title,
          { color: moodInfos.color }
        ]}
      >
        { title[gender === 'MALE' ? 0 : 1] }
      </Text>
      <Text style={styles.paragraph}>
        { content }
      </Text>
    </>
  );
}

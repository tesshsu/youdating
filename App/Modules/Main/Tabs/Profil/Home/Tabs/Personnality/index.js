import React, { useMemo, useCallback, useState } from 'react';
import { Text, View, Alert } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';
import styles from './styles';
import { Image } from 'react-native-expo-image-cache';
import MoodSelector from '../../../../../../Global/MoodSelector';
import useCurrentMood from '../../../../../../../Hooks/useCurrentMood';
import useLogguedUser from '../../../../../../../Hooks/useLogguedUser';
import * as PERSONNALITY_DETAILS from '../../../../../../../PersonnalityDetails';
import Stats from '../Stats';

export default function Personnality() {
  const { moodInfos, currentMood } = useCurrentMood();
  const { logguedUser: { gender, personalities, ...logguedUser }, updateSkills } = useLogguedUser();
  const [skills, setSkills] = useState(() => logguedUser.skills);
  const [debouncedUpdate] = useDebouncedCallback(
    async () => {
      try {
        await updateSkills(skills);
      } catch (err) {
        Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour des skills');
      }
    },
    1000
  );
  const IMAGE_STARS = require('../../../../../../../../assets/images/stars.png');
  const setOpinion = useCallback((value) => {
    let opinion = value;

    if (value === 0) {
      opinion = null;
    } else if (value === 11) {
      opinion = 10;
    }

    setSkills({ ...skills, opinion });
    debouncedUpdate();
  }, [debouncedUpdate, skills]);

  const {
    title,
    content,
	advice,
	personnality
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
      <Stats />
    </>
  );
}

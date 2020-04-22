import React, { useMemo, useCallback, useState } from 'react';
import { Text, View, Alert } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

import styles from './styles';

import MoodSelector from '../../../../../../Global/MoodSelector';
import useCurrentMood from '../../../../../../../Hooks/useCurrentMood';
import useLogguedUser from '../../../../../../../Hooks/useLogguedUser';
import * as PERSONNALITY_DETAILS from '../../../../../../../PersonnalityDetails';
import MoodText from '../../../../../../Global/MoodText';
import CustomSlider from '../../../../../../Global/CustomSlider';
import { verticalScale } from '../../../../../../../Helpers/ScaleHelper';

export default function Personnality() {
  const { moodInfos, currentMood } = useCurrentMood();
  const { logguedUser: { gender, personnalities, ...logguedUser }, updateSkills } = useLogguedUser();
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
    content
  } = useMemo(() => PERSONNALITY_DETAILS[currentMood][personnalities.main], [currentMood, personnalities]);

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
      <View style={styles.section}>
        <MoodText style={styles.sectionTitle}>Avis sur votre personnalité</MoodText>
        <View style={styles.sliderContainer}>
          <CustomSlider
            containerStyle={[styles.slider, { marginBottom: verticalScale(30) }]}
            value={skills.opinion || 0}
            step={1}
            min={0}
            max={11}
            labels={[
              { label: '10%', value: 1 },
              { label: '20%', value: 2 },
              { label: '30%', value: 3 },
              { label: '40%', value: 4 },
              { label: '50%', value: 5 },
              { label: '60%', value: 6 },
              { label: '70%', value: 7 },
              { label: '80%', value: 8 },
              { label: '90%', value: 9 },
              { label: '100%', value: 10 },
            ]}
            onValueChange={value => setOpinion(value)}
          />
        </View>
      </View>
    </>
  );
}

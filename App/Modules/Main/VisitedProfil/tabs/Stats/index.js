import React from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

import styles from './styles';
import MoodSelector from '../../../../Global/MoodSelector';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import { moderateScale, verticalScale } from '../../../../../Helpers/ScaleHelper';
import * as PERSONNALITY_DETAILS from '../../../../../PersonnalityDetails';
import useVisitedProfil from '../../../../../Hooks/useVisitedProfil';

const IMAGE_STARS = require('../../../../../../assets/images/stars.png');

export default function Stats() {
  const { moodInfos, currentMood } = useCurrentMood();
  const { profil } = useVisitedProfil();

  const { stats } = PERSONNALITY_DETAILS[currentMood][profil.personalities.main];

  return (
    <>
      <MoodSelector />
      <Image
        source={stats.image}
        style={styles.graphImage}
      />
      <Text style={styles.title}>STATISTIQUES INDIVIDUELLES</Text>
      <View>
        { stats.stats.map(({ title, letter, value }) => (
          <View key={title} style={styles.row}>
            <View style={styles.label}>
              <Text style={styles.labelText}>{ title }</Text>
            </View>
            <View style={styles.letter}>
              <Text style={styles.letterText}>{ letter }</Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.valueText}>
                { value }
              </Text>
            </View>
          </View>
        ))}
        <Text style={styles.title}>RESULTATS</Text>
        { stats.results.map(({ title, value }) => (
          <View key={title} style={styles.row}>
            <View style={styles.label}>
              <Text style={styles.labelText}>
                {`${title} :`}
              </Text>
            </View>
            <View style={styles.value}>
              <Text style={styles.valueText}>
                { value }
              </Text>
            </View>
          </View>
        ))}
        <Text style={styles.title}>NOTE GLOBALE</Text>
        <View style={styles.row}>
          <View style={styles.label}>
            <Text
              style={[
                styles.labelText,
                {
                  color: moodInfos.color,
                  fontWeight: 'bold',
                  fontSize: moderateScale(18)
                }
              ]}
            >
            E.L.C.T
            </Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.valueText}>
              <Text
                style={{
                  color: moodInfos.color,
                  fontSize: moderateScale(18)
                }}
              >
                { stats.note }
              </Text>
              /20
            </Text>
          </View>
        </View>
        <View style={styles.line} />
        <Text
          style={[
            styles.title,
            { color: moodInfos.color }
          ]}
        >
        CONSEIL
        </Text>
        <Text style={[styles.text, { textAlign: 'center', textTransform: 'uppercase' }]}>
          { stats.advice }
        </Text>
        <View style={styles.line} />
        <Text style={styles.title}>LEADERENT</Text>
        <View style={styles.row}>
          <View style={styles.label}>
            <Text
              style={[
                styles.labelText,
                {
                  fontFamily: 'Segoe-UI-Bold',
                  color: moodInfos.color,
                  fontSize: moderateScale(19),
                  marginBottom: verticalScale(22)
                }
              ]}
            >
              { stats.type }
            </Text>
          </View>
          <View style={styles.value}>
            <Image
              source={IMAGE_STARS}
              style={styles.starsImage}
            />
          </View>
        </View>
      </View>
    </>
  );
}

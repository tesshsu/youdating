import React from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

import styles from './styles';
import MoodSelector from '../../../../../../Global/MoodSelector';
import useCurrentMood from '../../../../../../../Hooks/useCurrentMood';
import { moderateScale, verticalScale } from '../../../../../../../Helpers/ScaleHelper';
import useLogguedUser from '../../../../../../../Hooks/useLogguedUser';
import * as PERSONNALITY_DETAILS from '../../../../../../../PersonnalityDetails';

const IMAGE_STARS = require('../../../../../../../../assets/images/stars.png');

export default function Stats() {
  const { moodInfos, currentMood } = useCurrentMood();
  const { logguedUser } = useLogguedUser();

  const { stats } = PERSONNALITY_DETAILS[currentMood][logguedUser.personalities.main];

  return (
    <>
      <Text  style={[
        styles.title,
        { color: moodInfos.color }
      ]}>STATISTIQUES INDIVIDUELLES</Text>
      <Image
        source={stats.image}
        style={styles.graphImage}
      />
      <View>
        { stats.stats.map(({ title, value }) => (
          <View key={title} style={styles.row}>
            <View style={styles.label}>
              <Text style={styles.labelText}>{ title }</Text>
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
        <Text style={styles.title}>{ logguedUser.personalities.main }</Text>
        <Text
          style={[
            styles.labelText,
            {
              fontFamily: 'Segoe-UI-Bold',
              color: moodInfos.color,
              fontSize: moderateScale(19),
              marginBottom: verticalScale(22),
              textAlign: 'center'
            }
          ]}
        >
          { stats.type }
        </Text>
        <View style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
          <Image
            source={IMAGE_STARS}
            style={styles.starsImage}
          />
        </View>
        <Text style={styles.addNoteDescription}>
          { stats.noteAddOn[1].description }
        </Text>
        <Text style={styles.addNoteDescription}>
          { stats.noteAddOn[1].plusnote }
        </Text>
        <Text
          style={[
            styles.labelText,
            {
              fontFamily: 'Segoe-UI-Bold',
              color: moodInfos.color,
              fontSize: moderateScale(19),
              textAlign: 'center'
            }
          ]}
        >
          { stats.noteAddOn[2].title }
        </Text>
        <Text style={styles.title}>{ stats.noteAddOn[2].subtitre }</Text>
        <Text style={styles.addNoteDescription}>
          { stats.noteAddOn[3].description }
        </Text>
        <Text
          style={[
            styles.labelText,
            {
              fontFamily: 'Segoe-UI-Bold',
              color: moodInfos.color,
              fontSize: moderateScale(19),
              textAlign: 'center',
              marginBottom: verticalScale(14),
            }
          ]}
        >
          { stats.noteAddOn[3].title }
        </Text>
        <Text style={styles.title}>{ stats.noteAddOn[3].subtitre }</Text>
        <Text style={styles.addNoteDescription}>
          { stats.noteAddOn[3].description }
        </Text>
      </View>
    </>
  );
}

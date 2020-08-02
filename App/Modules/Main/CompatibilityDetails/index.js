import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  ImageBackground,
  ScrollView
} from 'react-native';

import styles from './styles';
import { Image } from 'react-native-expo-image-cache';
import useCurrentMood from '../../../Hooks/useCurrentMood';
import RoundIconButton from '../../Global/RoundIconButton';
import Button from '../../Global/Button';
import { verticalScale } from '../../../Helpers/ScaleHelper';
import useLogguedUser from '../../../Hooks/useLogguedUser';
import useCompatibilityRequests from '../../../Hooks/useCompatibilityRequests';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import { COMPATIBILITY_RESULT } from '../../../GlobalConfig';

export default function CompatibilityDetails({ navigation }) {
  const { moodInfos, currentMood } = useCurrentMood();
  const { logguedUser } = useLogguedUser();

  const { fetchAll: fetchAllCompatibilityRequests, fetch, isFetching, results, compatibilityRequests } = useCompatibilityRequests();
  const target = navigation.getParam('target');

  if (!target) {
    return (null);
  }

  let imageSource, firstName;
  const { moods } = target;
  imageSource = moods[currentMood]?.avatar;
  firstName = target.firstName;
  // get compatibility result
 const compatibilityRequestResults = compatibilityRequests.compatibilityRequests.filter((cr) => {
       return cr.mood === currentMood && cr.target.id === target.id;
   });

  // Results could be
  const crResult = !compatibilityRequestResults.length ? undefined : COMPATIBILITY_RESULT[compatibilityRequestResults[0].result];
  if (!crResult) {
    return (null);
  }
  return (
    <ImageBackground
      style={styles.container}
      source={moodInfos.match[crResult].backgroundImage}
    >
      <Text style={styles.matchingTextYous}>YOU'S</Text>
	  <Text style={styles.matchingText}>MATCHING</Text>
      <Text style={[
                      styles.resultTitleText,
                      { backgroundColor: moodInfos.color }
                    ]}
                  >
         {moodInfos.match[crResult].title}
      </Text>
	  <Image
            uri={imageSource}
            style={[styles.imageBackground]}
       />
      <Text style={styles.noteTypeText}>
         Dans cette relation vous êtes complémentaire à {moodInfos.match[crResult].note}% avec {firstName}
      </Text>
      <Text style={styles.personnalityTypeText}>
        {moodInfos.match[crResult].contentTitle}
      </Text>
      <ScrollView
       style={styles.scrollView}>
      <Text style={styles.personnalityDescText} >
        {moodInfos.match[crResult].content}
      </Text>
      </ScrollView>
      <Text style={[
                     styles.resultTitleText,
                     { backgroundColor: moodInfos.color }
                   ]}
             onPress={() => NavigationHelper.back()}
      >
          REVENIR PLUS TARD
      </Text>
    </ImageBackground>
  );
}
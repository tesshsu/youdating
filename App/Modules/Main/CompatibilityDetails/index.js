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
import ImageButton from '../../Global/ImageButton';
import { verticalScale } from '../../../Helpers/ScaleHelper';
import useLogguedUser from '../../../Hooks/useLogguedUser';
import useCompatibilityRequests from '../../../Hooks/useCompatibilityRequests';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import Button from '../../Global/Button';

const COMPATIBILITY_RESULT = {
    POOR:'mauvaise',
    INSUFFICIENT:'insuffisante',
    SATISFACTORY:'satisfaisante',
    PERFECT:'excellente',
};

export default function CompatibilityDetails({ navigation }) {
  const { moodInfos, currentMood } = useCurrentMood();
  const { logguedUser } = useLogguedUser();
  const { isFetching, results, compatibilityRequests } = useCompatibilityRequests();

  const { fetchAll: fetchAllCompatibilityRequests, fetch } = useCompatibilityRequests();
  const target = navigation.getParam('target');

  if (!target) {
    return (null);
  }

  let imageSource;
  const { moods } = target;
  imageSource = moods[currentMood]?.avatar;

  // get compatibility result
  const compatibilityRequestResults = compatibilityRequests.filter((cr) => {
      return cr.mood === currentMood && cr.target === target.id;
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
	  <Button
        text={moodInfos.match[crResult].title}
        size={verticalScale(50)}
        onPress={() => NavigationHelper.back()}
      />
	  <Image
            uri={imageSource}
            style={[styles.imageBackground]}
       />
        <ImageButton
                         onPress={() => { }}
                         imageSource={moodInfos.match[crResult].graphic}
                         imageStyle={styles.iconStyle}
                       />
      <Text style={styles.personnalityTypeText}>
        {moodInfos.match[crResult].contentTitle}
      </Text>
      <ScrollView
       style={styles.scrollView}>
      <Text style={styles.personnalityDescText} >
        {moodInfos.match[crResult].content}
      </Text>
      </ScrollView>
      <Button
        text={'REVENIR PLUS TARD'}
        size={verticalScale(50)}
        onPress={() => NavigationHelper.back()}
      />
    </ImageBackground>
  );
}

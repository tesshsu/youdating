import React, { useState, useCallback } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import MoodSelector from '../../../../../../Global/MoodSelector';
import useCurrentMood from '../../../../../../../Hooks/useCurrentMood';
import { verticalScale } from '../../../../../../../Helpers/ScaleHelper';
import useLogguedUser from '../../../../../../../Hooks/useLogguedUser';

export default function Skills() {
  const { moodInfos, currentMood } = useCurrentMood();
  const { logguedUser, updateSkills } = useLogguedUser();
  const { avatar } = logguedUser.moods[currentMood];
  const imageSource = avatar || logguedUser.avatar;
  const IMAGE_GIRL3 = require('../../../../../../../../assets/images/profile_pics/girl3.jpg');
  return (
    <>
      <MoodSelector containerStyle={{ marginBottom: 0 }} />
      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => NavigationHelper.navigate('MainTabsEditDescription')}
          style={styles.descriptionContainer}
        >
          <Text style={styles.descriptionText}>{logguedUser.moods[currentMood].description || 'Entrez une description'}</Text>
        </TouchableOpacity>
      </View>
	    <View
                  style={
                    styles.avatarContainer}
                >
                  <ImageBackground
                    style={styles.imageBackground}
                    imageStyle={styles.imageBackgroundImage}
                    source={IMAGE_GIRL3}
                  />
                </View>

      </>
  );
}

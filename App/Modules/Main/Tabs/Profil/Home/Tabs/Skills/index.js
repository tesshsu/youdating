import React, { useState, useCallback } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';
import MoodSelector from '../../../../../../Global/MoodSelector';
import useCurrentMood from '../../../../../../../Hooks/useCurrentMood';
import GridView from '../../../../../../Global/GridView';
import useLogguedUser from '../../../../../../../Hooks/useLogguedUser';
import NavigationHelper from '../../../../../../../Helpers/NavigationHelper';

export default function Skills() {
  const { moodInfos, currentMood } = useCurrentMood();
  const { logguedUser, updateSkills } = useLogguedUser();
  const IMAGE_GIRL3 = require('../../../../../../../../assets/images/profile_pics/girl3.jpg');
  const { photos } = logguedUser.moods[currentMood];
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
	   <View style={styles.imagesContainer}>
       <GridView
         items={photos}
         styles={styles.itemStyle}
       />
      </View>
      </>
  );
}

import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import styles from './styles';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';
import { Image } from 'react-native-expo-image-cache';
import useLogguedUser from '../../../../../Hooks/useLogguedUser';
import RoundButton from '../../../../Global/RoundButton';
const IMAGE_GIRL3 = require('../../../../../../assets/images/profile_pics/girl3.jpg');

export default function CompatibilityResult({ user }) {
  const { logguedUser } = useLogguedUser();
  const { currentMood, moodInfos } = useCurrentMood();
  const { avatar } = logguedUser.moods[currentMood];
  const imageSource = avatar || logguedUser.avatar;
  if (!user) {
    return (null);
  }

  return (
    <View style={styles.compatibilityResult}>
      <Text style={styles.resultTitleText}>Résultats de mes intéractions</Text>
      <View>
        <Text
          style={[
            styles.resultText,
            { color: moodInfos.color }
          ]}
        >
          {`Excellente compatibilité ${moodInfos.titleFeminize}`}
        </Text>
      </View>
      <View style={styles.bigAvatarPart}>
        <Image
          style={styles.imageBackground}
          uri={imageSource}
        />
        <View style={{ width: '100%'}}>
          <Text style={[styles.timeText, {color: 'gray'}]}>I think this message is last message from logged user send.</Text>
        </View>
      </View>
    </View>
  );
}

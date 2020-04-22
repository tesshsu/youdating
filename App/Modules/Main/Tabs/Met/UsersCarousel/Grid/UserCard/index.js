import React from 'react';
import {
  Text,
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import styles from './styles';
import useCurrentMood from '../../../../../../../Hooks/useCurrentMood';
import YousOn from '../../../../../../Global/YousOn';


export default function UserCard(props) {
  const {
    avatar,
    firstName,
    onConsultProfil,
    birthday,
    city
  } = props;

  const { moodInfos } = useCurrentMood();

  return (
    <TouchableOpacity
      containerStyle={styles.container}
      style={styles.container}
      onPress={onConsultProfil}
    >
      <Image
        style={styles.image}
        uri={avatar}
      />
      <Text
        style={[
          styles.nameText,
          { color: moodInfos.color }
        ]}
      >
        { firstName }
      </Text>
      <YousOn online size={3}>
        <Text style={styles.infosText}>
          {`${moment().diff(moment.unix(birthday), 'years')}ANS-${city}`}
        </Text>
      </YousOn>
    </TouchableOpacity>
  );
}

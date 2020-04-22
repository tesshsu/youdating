import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  Image
} from 'react-native-expo-image-cache';
import moment from 'moment';

import styles from './styles';
import YousOn from '../../../../../../Global/YousOn';
import RoundButton from '../../../../../../Global/RoundButton';
import { scale, verticalScale } from '../../../../../../../Helpers/ScaleHelper';

export default function UserCard(props) {
  const {
    firstName,
    avatar,
    birthday,
    city,
    description,
    maxHeight,
    onConsultProfil
  } = props;

  return (
    <View
      style={[
        styles.itemContainer,
        { height: maxHeight }
      ]}
    >
      <Image
        uri={avatar}
        style={styles.imageContainer}
        imageStyle={styles.image}
      />
      <View style={styles.profileFooterContainer}>
        <View>
          <Text style={styles.usernameText}>{firstName}</Text>
          <YousOn online>
            <Text style={styles.userInfosText}>{`${moment().diff(moment.unix(birthday), 'years')}ANS-${city}`}</Text>
          </YousOn>
        </View>
        <RoundButton
          text="consulter profil"
          width={scale(113)}
          height={verticalScale(30)}
          borderRadius={verticalScale(6)}
          onPress={onConsultProfil}
        />
      </View>
      <Text style={styles.citation} numberOfLines={3}>
        { description && description !== '' ? `"${description}"` : ''}
      </Text>
    </View>
  );
}

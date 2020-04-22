import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { useNavigationParam } from 'react-navigation-hooks';

import moment from 'moment';
import styles from './styles';
import PageHeader from '../../Global/PageHeader';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import useConversation from '../../../Hooks/useConversations';
import UtilsHelper from '../../../Helpers/UtilsHelper';

import * as PERSONNALITY_DETAILS from '../../../PersonnalityDetails';
import { MOODS } from '../../../GlobalConfig';

export default function MainTchatNewMessage() {
  const { startConversation } = useConversation();
  const { mood, lastMessage } = useNavigationParam('conversation');
  const user = useNavigationParam('target');

  if (!user) {
    return (null);
  }

  const {
    content,
    imageUri,
    audioUri,
    sentAt,
  } = lastMessage;

  const moodInfos = MOODS[mood];

  return (
    <>
      <PageHeader
        title="Opportunité"
        backButton
      />
      <View style={styles.container}>
        <Text
          style={[
            styles.titleText,
            { color: moodInfos.color }
          ]}
        >
          Donne une chance au destin
        </Text>
        <Image
          style={styles.image}
          uri={user.moods[mood].avatar}
        />
        <View style={styles.userInfos}>
          <Text style={styles.usernameText}>{ user.firstName }</Text>
          <Text style={styles.ageAndPlaceText}>{`38ans-${user.city}`}</Text>
          <Text
            style={[
              styles.personnalityText,
              { color: moodInfos.color }
            ]}
          >
            { PERSONNALITY_DETAILS[mood][user.personnalities.main].personnality }
          </Text>
        </View>
        <View style={styles.message}>
          <Text style={styles.dayText}>{UtilsHelper.getDateText(moment.unix(sentAt))}</Text>
          <Text style={styles.timeText}>
            {moment.unix(sentAt).format('HH:mm')}
          </Text>
          <Text
            style={styles.messageContentText}
            numberOfLines={4}
          >
            {content !== '' && content }
            {content === '' && imageUri !== undefined && `${user.firstName} à envoyé une photo!`}
            {content === '' && audioUri !== undefined && `${user.firstName} à envoyé un message vocal!`}
          </Text>
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: moodInfos.color }
            ]}
            onPress={() => startConversation(mood, user)}
          >
            <Text style={styles.buttonText}>Repondre</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: moodInfos.color }
            ]}
            onPress={() => NavigationHelper.back()}
          >
            <Text style={styles.buttonText}>Ignorer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

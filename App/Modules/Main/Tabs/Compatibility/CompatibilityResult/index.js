import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import useLogguedUser from '../../../../../Hooks/useLogguedUser';
import ImageButton from '../../../../Global/ImageButton';
import { ActionButton } from '../../../../Global/Profile';
import * as PERSONNALITY_DETAILS from './../../../../../PersonnalityDetails';
import styles from './styles';
import useCompatibilityRequests from '../../../../../Hooks/useCompatibilityRequests';
const COMPATIBILITY_SATIFAISANT = require('../../../../../../assets/icons/icon_compatibilite_satifaisante.png');
const COMPATIBILITY_MAUVAISE = require('../../../../../../assets/icons/icon_compatibilite_mauvaise.png');
const COMPATIBILITY_UNSUFFISANTE = require('../../../../../../assets/icons/icon_compatibilite_insuffisante.png');
const COMPATIBILITY_EXCELLENT = require('../../../../../../assets/icons/icon_compatibilite_excellent.png');


export default function CompatibilityResult({ user }) {
  const [search, setSearch] = useState(null);
  const [datas, setDatas] = useState(null);
  const [conversation, setConversation] = useState(null);
  const [compatibilityRequests] = useState(null);
  const { create, fetchAll } = useCompatibilityRequests();

  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser } = useLogguedUser();
  const { avatar } = logguedUser.moods[currentMood];
  const startCompatibilityRequest = useCallback((conversation) => {
       NavigationHelper.navigate('MainCompatibilityDetails', { user });
        const {
           user1,
           user2
         } = conversation;

        const target = user1.id === logguedUser.id ? user2 : user1;
     	create( target );
  }, [currentMood, logguedUser.id, create]);


  let imageSource, firstName, personality, age, city, message, subPersonality, result;
  if (!user) {
    return (null);
  }

  const { user1, user2, lastMessage } = user;
  const target = user1.id === logguedUser.id ? user2 : user1;
  const { moods, personalities } = target;
  imageSource = moods[currentMood].avatar;
  firstName = target.firstName;
  personality = personalities.main;
  city = target.city;
  subPersonality = PERSONNALITY_DETAILS[currentMood][personality].personality, [currentMood, personality]
  //result = target.resultCo.result;

  const Actions = () => {
      return (
        <View style={{ position: 'absolute', right: 4, bottom: 8 }}>
          <ActionButton
            onPress={() => NavigationHelper.navigate('MainTabsTchat')}
            text="MESSAGERIE"
            iconName="message-square"
          />
          <ActionButton
            //onPress={() => NavigationHelper.navigate('MainCompatibilityDetails', { user })}
            onPress={() => startCompatibilityRequest(user )}
            text="COMPATIBILITER"
            iconName="refresh-cw"
          />
          <ActionButton
            onPress={() => NavigationHelper.navigate('MainTabsProfilInvite')}
            text="INVITE"
            iconName="user-plus"
          />
          <ImageButton
            onPress={() => { }}
            imageSource={COMPATIBILITY_SATIFAISANT}
            imageStyle={styles.iconStyle}
          />
        </View>
      )
    }

  return (
    <View style={styles.compatibilityResult}>
      <Text style={styles.resultTitleText}>Résultats de mes intéractions</Text>
      <Text
        style={[
          styles.resultsubTitleText,
          { color: moodInfos.color }
        ]}
      >
        {`Compatibilité personnelle ${moodInfos.titleFeminize}`}
      </Text>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarImageContainer}>
          <Image uri={imageSource} style={styles.avatarImage} />
          <View style={styles.avatarHeader}>
            <Text style={styles.headerText}> {`${age}ANS-${city || 'PARIS'}`} </Text>
          </View>
          <View style={styles.userInfos}>
            <Text style={styles.usernameText}>{firstName}</Text>
            <Text style={[styles.personaliteText, { color: moodInfos.color }]}>{personality}</Text>
            <Text style={styles.subPersonaliteText}>{subPersonality}</Text>
          </View>
          <Actions />
        </View>
      </View>
      <Text style={[styles.lastMessageText, { color: 'gray' }]}>{lastMessage.content}</Text>
    </View>
  );
}

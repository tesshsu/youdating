import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import useLogguedUser from '../../../../../Hooks/useLogguedUser';
import useConversation from '../../../../../Hooks/useConversations';
import useVisitedProfil from '../../../../../Hooks/useVisitedProfil';
import { ActionButton } from '../../../../Global/Profile';
import ImageButton from '../../../../Global/ImageButton';
import * as PERSONNALITY_DETAILS from './../../../../../PersonnalityDetails';
import styles from './styles';
import useCompatibilityRequests from '../../../../../Hooks/useCompatibilityRequests';
import { COMPATIBILITY_RESULT } from '../../../../../GlobalConfig';

export default function CompatibilityResult({ user }) {
  const [search, setSearch] = useState(null);
  const [datas, setDatas] = useState(null);
  const [conversation, setConversation] = useState(null);
  const { create, fetchAll: fetchAllCompatibilityRequests,  isFetching, compatibilityRequests } = useCompatibilityRequests();
 const { visitProfil } = useVisitedProfil();
  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser } = useLogguedUser();
  const { startConversation } = useConversation();
  const { avatar } = logguedUser.moods[currentMood];
  const startCompatibilityRequest = useCallback((conversation) => {
       const {
          user1,
          user2
        } = conversation;
       const target = user1.id === logguedUser.id ? user2 : user1;
       NavigationHelper.navigate('MainCompatibilityDetails', { target });

     create( target );
  }, [currentMood, logguedUser.id, create]);

  let ProfileimageSource, firstName, personality, age, city, message, subPersonality, result;
  if (!user) {
    return (null);
  }

  age = moment().diff(moment(logguedUser.birthday), 'years');
  const { user1, user2, lastMessage } = user;
  const target = user1.id === logguedUser.id ? user2 : user1;
  const { moods, personalities } = target;
  ProfileimageSource = moods[currentMood]?.avatar;;
  firstName = target.firstName;
  personality = personalities.main;
  city = target.city;
  subPersonality = PERSONNALITY_DETAILS[currentMood][personality].personality, [currentMood, personality]

  // get compatibility result
  const compatibilityRequestResults = compatibilityRequests?.compatibilityRequests?.filter((cr) => {
      return cr.mood === currentMood && (cr.target === target.id  || cr.target?.id === target.id);
  });

  const crResult = !compatibilityRequestResults?.length ? undefined : COMPATIBILITY_RESULT[compatibilityRequestResults[0].result];

  const Actions = () => {
      return (
        <View style={{ position: 'absolute', right: 4, bottom: 8 }}>
          <ActionButton
            onPress={() => startConversation(currentMood, target)}
            text="MESSAGERIE"
            iconName="message-square"
          />
          <ActionButton
            onPress={() => startCompatibilityRequest(user )}
            text="COMPATIBILITER"
            iconName="refresh-cw"
          />
          <ActionButton
            onPress={() => visitProfil(target.id)}
            text="PROFIL"
            iconName="user"
          />
          {crResult && (
            <ImageButton
                                onPress={() => { }}
                                imageSource={moodInfos.match[crResult].graphic}
                                imageStyle={styles.iconStyle}
                     />
           )}
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
          {ProfileimageSource && (
               <Image uri={ProfileimageSource}  style={styles.avatarImage} />
              )
           }
          <View style={styles.avatarHeader}>
            <Text style={styles.headerText}> {`${age}ANS-${city || 'PARIS'}`} </Text>
          </View>
          <View style={styles.userInfos}>
            <Text style={styles.usernameText}>{firstName}</Text>
            {personality && (
                 <Text style={[styles.personaliteText, { color: moodInfos.color }]}>{personality}</Text>
                 )
            }
             {subPersonality && (
                   <Text style={styles.subPersonaliteText}>{subPersonality}</Text>
                   )
             }
          </View>
          <Actions />

        </View>
      </View>
    </View>
  );
}
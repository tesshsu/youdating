import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'react-native-expo-image-cache';
import { TouchableOpacity } from 'react-native-gesture-handler';


import styles from './styles';
import { verticalScale, moderateScale } from '../../../../Helpers/ScaleHelper';
import NavigationHelper from '../../../../Helpers/NavigationHelper';
import TchatPopup from './TchatPopup';
import MessageComposer from './MessageComposer';
import useConversation from '../../../../Hooks/useConversations';
import { MOODS } from '../../../../GlobalConfig';
import useLogguedUser from '../../../../Hooks/useLogguedUser';
import useGoodFeelings from '../../../../Hooks/useGoodFeelings';
import useVisitedProfil from '../../../../Hooks/useVisitedProfil';

export default function TchatConversationMessages() {
  const { activeConversation } = useConversation();
  const { logguedUser, fetchRemainingAllowedMessages } = useLogguedUser();
  const { sent, received } = useGoodFeelings();
  const { visitProfil } = useVisitedProfil();

  const {
    target,
    mood,
    messages
  } = activeConversation;

  const moodInfos = MOODS[mood];

  useEffect(() => {
    fetchRemainingAllowedMessages();
  }, [fetchRemainingAllowedMessages]);

  return (
    <View
      style={styles.container}
    >
      <View style={{ backgroundColor: moodInfos.color }}>
        <SafeAreaView>
          <View style={styles.header}>
            <Feather
              name="chevron-left"
              color="white"
              size={verticalScale(21)}
              onPress={() => NavigationHelper.navigate('MainTabsTchatList')}
            />
            <View style={styles.userInfos} onPress={() => visitProfil(target.id)}>
              <TouchableOpacity onPress={() => visitProfil(target.id)}>
                <Image
                  uri={target.moods[mood].avatar}
                  style={styles.userHeaderImage}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.usernameText}>{target.firstName}</Text>
                <Text style={styles.personnality}>{target.personalities.main}</Text>
                <Text style={styles.mood}>{`mood ${moodInfos.title}`}</Text>
              </View>
            </View>
            <Feather
              name="more-vertical"
              color="white"
              size={verticalScale(24)}
              onPress={() => NavigationHelper.navigate('MainGlobalSettings')}
            />
          </View>
        </SafeAreaView>
      </View>
      <TchatPopup />
       <MessageComposer />
    </View>
  );
}

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

  const {
    canSendMessage,
    reason
  } = useMemo(() => {
    const { remainingAllowedMessages } = logguedUser;
    const lastMessage = messages[messages.length - 1];

    console.log(remainingAllowedMessages);

    if (
      lastMessage
      && lastMessage.isOpportunity
      && lastMessage.author === logguedUser.id
    ) {
      return {
        canSendMessage: false,
        reason: `Vous devez attendre que ${target.firstName} vous réponde`
      };
    }

    if (!lastMessage) {
      const recevivedGF = received.some(r => r.author.id === target.id);
      const sentGF = sent.some(s => s.target.id === target.id);

      if (recevivedGF && sentGF) {
        return {
          canSendMessage: true,
          reason: null
        };
      }

      return {
        canSendMessage: remainingAllowedMessages > 0,
        reason: !remainingAllowedMessages ? 'Nombre maximum de messages atteint' : null
      };
    }

    return {
      canSendMessage: true,
      reason: null
    };
  }, [logguedUser, messages, received, sent, target]);

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
                <Text style={styles.personnality}>{target.personnalities.main}</Text>
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
      { canSendMessage && <MessageComposer /> }
      { !canSendMessage && (
        <SafeAreaView style={[styles.locked, { backgroundColor: moodInfos.color }]}>
          <View style={styles.locked}>
            <Feather name="lock" color="white" size={moderateScale(25)} />
            <Text style={styles.lockedText}>{ reason }</Text>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

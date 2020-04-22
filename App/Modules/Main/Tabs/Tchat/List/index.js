import React, { useCallback } from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  RefreshControl,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'react-native-expo-image-cache';

import moment from 'moment';
import PageHeader from '../../../../Global/PageHeader';
import MoodSelectorHeaderButton from '../../../../Global/MoodSelectorHeaderButton';
import { verticalScale } from '../../../../../Helpers/ScaleHelper';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import styles from './styles';
import ListItemSeparator from '../../../../Global/ListItemSeparator';
import RoundIconButton from '../../../../Global/RoundIconButton';
import useConversation from '../../../../../Hooks/useConversations';
import useLogguedUser from '../../../../../Hooks/useLogguedUser';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';

const TEXT = {
  PRO: 'professionnelles',
  SOCIAL: 'sociales',
  LOVE: 'de couples',
  PERSO: 'personnelles'
};

export default function MainTabsTchat() {
  const {
    conversations,
    startConversation,
    fetchConversations,
    areConversationsFetching
  } = useConversation();

  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser } = useLogguedUser();

  const openConversation = useCallback((conversation) => {
    const {
      user1,
      user2,
      lastMessage
    } = conversation;

    const target = user1.id === logguedUser.id ? user2 : user1;

    if (lastMessage.isOpportunity && lastMessage.author !== logguedUser.id) {
      NavigationHelper.navigate('MainTchatNewMessage', { conversation, target });
    } else {
      startConversation(currentMood, target);
    }
  }, [currentMood, logguedUser.id, startConversation]);

  return (
    <View style={styles.container}>
      <PageHeader
        leftComponent={() => <MoodSelectorHeaderButton />}
        title="MESSAGERIE"
      />
      <Text style={styles.titleText}>
        {`Mes conversations ${TEXT[currentMood]}`}
      </Text>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        ItemSeparatorComponent={ListItemSeparator}
        data={conversations}
        refreshing={areConversationsFetching}
        refreshControl={(
          <RefreshControl
            refreshing={areConversationsFetching}
            onRefresh={fetchConversations}
          />
        )}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          const target = item.user1.id === logguedUser.id ? item.user2 : item.user1;
          const newMessageKey = target === item.user1 ? 'user2' : 'user1';
          const hasNewMessage = item[`${newMessageKey}unreadMessageCount`] > 0;

          const conversation = { ...item };

          const {
            lastMessage: {
              author,
              sentAt,
              content,
              imageUri,
              audioUri
            }
          } = item;

          const lastMessageStr = author === logguedUser.id ? 'Vous avez' : `${target.firstName} a`;
          console.log(imageUri, audioUri);
          return (
            <TouchableOpacity
              style={styles.messageListItem}
              onPress={() => openConversation(conversation)}
            >
              <Image
                style={styles.imageStyle}
                uri={target.moods[currentMood].avatar}
              />
              <View style={styles.body}>
                <View style={styles.header}>
                  <View style={styles.headerLeft}>
                    <Text style={styles.usernameText}>{ target.firstName }</Text>
                    <Text
                      style={[
                        styles.personnalityText,
                        { color: moodInfos.color }
                      ]}
                    >
                      { target.personnalities.main }
                    </Text>
                  </View>
                  <View style={styles.headerRight}>
                    <Text
                      style={[
                        styles.lastMsgTimeText,
                        { color: moodInfos.color }
                      ]}
                    >
                      { moment.unix(sentAt).format('HH:ss') }
                    </Text>
                    <Feather
                      name="chevron-right"
                      color={moodInfos.color}
                      size={verticalScale(18)}
                    />
                  </View>
                </View>
                <View style={styles.footer}>
                  <Text
                    style={styles.lastMsgText}
                    numberOfLines={2}
                  >
                    {content !== '' && content }
                    {content === '' && imageUri !== undefined && `${lastMessageStr} envoyé une photo!`}
                    {content === '' && audioUri !== undefined && `${lastMessageStr} envoyé un message vocal!`}
                  </Text>
                  { hasNewMessage && (
                    <RoundIconButton
                      containerStyle={styles.button}
                      backgroundColor={moodInfos.color}
                      iconColor="white"
                      iconName="message-square"
                      size={verticalScale(34)}
                      iconSize={verticalScale(14)}
                      onPress={() => startConversation(currentMood, target)}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

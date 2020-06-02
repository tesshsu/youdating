import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import RoundIconButton from '../../../../Global/RoundIconButton';
import { verticalScale } from '../../../../../Helpers/ScaleHelper';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import useLogguedUser from '../../../../../Hooks/useLogguedUser';
import ListItemSeparator from '../../../../Global/ListItemSeparator';
import useConversation from '../../../../../Hooks/useConversations';
import { Image } from 'react-native-expo-image-cache';
const IMAGE_GIRL3 = require('../../../../../../assets/images/profile_pics/girl3.jpg');
const IMAGE_GIRL4 = require('../../../../../../assets/images/profile_pics/girl4.jpg');
const IMAGE_GIRL5 = require('../../../../../../assets/images/profile_pics/girl5.jpg');
const IMAGE_GIRL6 = require('../../../../../../assets/images/profile_pics/girl6.jpg');
const IMAGE_GIRL7 = require('../../../../../../assets/images/profile_pics/girl7.jpg');
const IMAGE_GIRL8 = require('../../../../../../assets/images/profile_pics/girl8.jpg');
const IMAGE_GIRL9 = require('../../../../../../assets/images/profile_pics/girl9.jpg');
const IMAGE_MAN4 = require('../../../../../../assets/images/profile_pics/man4.jpg');

const USERS = [
  {
    id: 0,
    username: 'Yelena',
    personnality: 'diplomatist',
    avatar: IMAGE_GIRL6,
    newMessage: true
  },
  {
    id: 1,
    username: 'Sophie',
    personnality: 'leaderent',
    avatar: IMAGE_GIRL5,
    disabled: true
  },
  {
    id: 2,
    username: 'Isabelle',
    personnality: 'diplomatist',
    avatar: IMAGE_GIRL9
  },
  {
    id: 3,
    username: 'Lou',
    personnality: 'ambitionnel',
    avatar: IMAGE_GIRL7
  },
  {
    id: 4,
    username: 'Margot',
    personnality: 'leaderent',
    avatar: IMAGE_GIRL3,
    disabled: true
  },
  {
    id: 5,
    username: 'Léa',
    personnality: 'diplomatist',
    avatar: IMAGE_GIRL4
  },
  {
    id: 6,
    username: 'Léa',
    personnality: 'diplomatist',
    avatar: IMAGE_GIRL8
  },
  {
    id: 7,
    username: 'Tom',
    personnality: 'ambitionnel',
    avatar: IMAGE_MAN4
  },
];

export default function CompatibilitiesList({ selectedUser, onSelected }) {
  const [carouselIndex, setCarrouselIndex] = useState(0);
  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser } = useLogguedUser();
  const {
    conversations,
    startConversation,
    fetchConversations,
    areConversationsFetching
  } = useConversation();

  const handleOnPress = useCallback((user) => {
    onSelected(user);
  }, [onSelected]);

  useEffect(() => {
    handleOnPress(null, 0);
  }, [moodInfos, handleOnPress]);

  useEffect(() => {
    setCarrouselIndex(0);
    onSelected(USERS[0]);
  }, [onSelected, moodInfos]);


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
  const slicedUsers = [];

  USERS.forEach((u) => {
    const lastArray = slicedUsers[slicedUsers.length - 1];

    if (!lastArray || lastArray.length === 4) {
      slicedUsers.push([u]);
    } else {
      lastArray.push(u);
    }
  });

  return (
    <View style={{ height: verticalScale(180) }}>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        horizontal={true}
        ItemSeparatorComponent={ListItemSeparator}
        showsHorizontalScrollIndicator={true}
        data={conversations}
        refreshing={areConversationsFetching}
        refreshControl={(
          <RefreshControl
            refreshing={areConversationsFetching}
            onRefresh={fetchConversations}
          />
        )}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
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
          return (
            <TouchableOpacity
              style={styles.messageListItem}
              onPress={() => openConversation(conversation)}
            >
              <View style={{alignItems: 'center'}}>
                <Image
                  style={[styles.imageStyle, {borderColor: moodInfos.color}]}
                  uri={target.moods[currentMood].avatar}
                />
                {
                  hasNewMessage && (
                    <View style={[{backgroundColor: moodInfos.color}, styles.messageCount]}>
                      <Text style={{color: '#fff'}}>
                        {item[`${newMessageKey}unreadMessageCount`]}
                      </Text>
                    </View>
                  )
                }
                <View style={{alignItems: 'center'}}>
                  <Text style={{fontSize: 12, textTransform: 'uppercase'}}>{ target.firstName }</Text>
                  <Text
                    style={styles.personnalityText}
                  >
                    { target.personnalities.main }
                    { hasNewMessage }
                  </Text>
                </View>
                <RoundIconButton
                  size={verticalScale(36)}
                  backgroundColor={item.disabled ? '#BEBFC0' : moodInfos.color}
                  IconProvider={Feather}
                  iconName="refresh-cw"
                  iconColor="white"
                  iconSize={verticalScale(20)}
                  onPress={() => handleOnPress(item, index)}
                  disabled={item.disabled}
                />
                <Text
                  style={[
                    styles.compatibilityText,
                    { color: item.disabled ? '#BEBFC0' : moodInfos.color }
                  ]}
                >
                  compatibilité
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
        <Feather
          name="chevron-right"
          color={moodInfos.color}
          style={{position: 'absolute', zIndex: 99, right: 0, top: 30}}
          size={verticalScale(30)}
        />
    </View>
  );
}

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
import { verticalScale } from '../../../../../Helpers/ScaleHelper';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import useLogguedUser from '../../../../../Hooks/useLogguedUser';
import ListItemSeparator from '../../../../Global/ListItemSeparator';
import useConversation from '../../../../../Hooks/useConversations';
import { Image } from 'react-native-expo-image-cache';

export default function CompatibilitiesList({ selectedUser, onSelected }) {
  const {flatListIndex, setFlatListIndex} = useState(0);
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

  return (
    <View style={{ height: verticalScale(120) }}>
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
              onPress={() => handleOnPress(item, index)}
            >
              <View style={{alignItems: 'center'}}>
                <Image
                  style={[styles.imageStyle, {borderColor: moodInfos.color}]}
                  uri={target.moods[currentMood].avatar}
                />
                <View style={{alignItems: 'center'}}>
                  <Text style={{fontSize: 10, textTransform: 'uppercase'}}>{ target.firstName }</Text>
                  <Text
                    style={styles.personnalityText}
                  >
                    { target.personnalities.main }
                    { hasNewMessage }
                  </Text>
                </View>
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

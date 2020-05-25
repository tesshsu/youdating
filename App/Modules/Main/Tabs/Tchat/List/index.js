import React, { useCallback, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Image } from 'react-native-expo-image-cache';

import moment from 'moment';
import PageHeader from '../../../../Global/PageHeader';
import MoodSelector from '../../../../Global/MoodSelector';
import SearchField from '../../../../Global/SearchField';
import { verticalScale } from '../../../../../Helpers/ScaleHelper';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import styles from './styles';
import ListItemSeparator from '../../../../Global/ListItemSeparator';
import RoundIconButton from '../../../../Global/RoundIconButton';
import useConversation from '../../../../../Hooks/useConversations';
import useLogguedUser from '../../../../../Hooks/useLogguedUser';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';

const IMAGE_GIRL3 = require('../../../../../../assets/images/profile_pics/girl3.jpg');

const TEXT = {
  PRO: 'professionnelles',
  SOCIAL: 'sociales',
  LOVE: 'de couples',
  PERSO: 'personnelles'
};

export default function MainTabsTchat() {
  const [search, setSearch] = useState(null);

  const {
    conversations,
    startConversation,
    fetchConversations,
    areConversationsFetching
  } = useConversation();

  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser } = useLogguedUser();

  const { avatar } = logguedUser.moods[currentMood];
  const imageSource = avatar || logguedUser.avatar;

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
        leftComponent={() => <Feather
              name="chevron-left"
              color="white"
              size={verticalScale(21)}
              onPress={() => NavigationHelper.back()}
            />}
        rightComponent={()=> <Feather
              name="more-vertical"
              color="white"
              size={verticalScale(21)}
              onPress={() => NavigationHelper.navigate('MainGlobalSettings')}
            />}
        title="MESSAGERIE"
      />
      <View style={{ alignItems: 'center'}}>
        <MoodSelector
          containerStyle={styles.modeSelector}
          moods={['PRO', 'SOCIAL', 'LOVE', 'PERSO']}
        />
      </View>
      <Text style={styles.titleText}>
        {`Mes conversations ${TEXT[currentMood]}`}
      </Text>
      <View style={{ alignItems: 'center'}}>
        <SearchField
          placeholder="Type Here..."
          lightTheme={true}
          onChangeText={(value)=>setSearch(value)}
          value={search}
          containerStyle={styles.searchField}
          inputContainerStyle={styles.searchInner}
        />
      </View>
      <View style={{ flexDirection: 'row' }}>
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
                        style={[
                          styles.personnalityText,
                          { color: moodInfos.color }
                        ]}
                      >
                        { target.personnalities.main }
                        { hasNewMessage }
                      </Text>
                  </View>
                </View>
                <View style={styles.body}>
                  <View style={styles.footer}>
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
        {
          !areConversationsFetching &&
          <Feather
            name="chevron-right"
            color={moodInfos.color}
            style={{paddingTop: '8%', zIndex: 99, marginRight: 20}}
            size={verticalScale(30)}
          />
        }
      </View>
      <View style={styles.bigAvatarPart}>
          <Image
            style={styles.imageBackground}
            uri={imageSource}
          />
          <Text style={styles.usernameText}>MOI</Text>
          <Text style={styles.grayText}>27ANS-PARIS</Text>
          <Text style={styles.msgTitle}>Aujourd hui</Text>
          <Text style={[styles.timeText, {color: moodInfos.color}]}>09.13</Text>
          <View style={{ width: '50%'}}>
            <Text style={[styles.timeText, {color: 'gray'}]}>I think this message is last message from logged user send.</Text>
          </View>
      </View>
    </View>
  );
}

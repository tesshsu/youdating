import { Feather } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';
import { verticalScale } from '../../../../../Helpers/ScaleHelper';
import useConversation from '../../../../../Hooks/useConversations';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import useLogguedUser from '../../../../../Hooks/useLogguedUser';
import ImageButton from '../../../../Global/ImageButton';
import MoodSelector from '../../../../Global/MoodSelector';
import PageHeader from '../../../../Global/PageHeader';
import RoundButton from '../../../../Global/RoundButton';
import RoundIconButton from '../../../../Global/RoundIconButton';
import SearchField from '../../../../Global/SearchField';
import styles from './styles';

const COMPATIBILITY_SATIFAISANT = require('../../../../../../assets/icons/icon_compatibilite_satifaisante.png');
const COMPATIBILITY_MAUVAISE = require('../../../../../../assets/icons/icon_compatibilite_mauvaise.png');
const COMPATIBILITY_UNSUFFISANTE = require('../../../../../../assets/icons/icon_compatibilite_insuffisante.png');
const COMPATIBILITY_EXCELLENT = require('../../../../../../assets/icons/icon_compatibilite_excellent.png');

const TEXT = {
  PRO: 'professionnelles',
  SOCIAL: 'sociales',
  LOVE: 'de couples',
  PERSO: 'personnelles'
};

export default function MainTabsTchat() {
  const [search, setSearch] = useState(null);
  const [datas, setDatas] = useState(null);

  const {
    conversations,
    startConversation,
    fetchConversations,
    areConversationsFetching
  } = useConversation();

  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser, uploadAvatar } = useLogguedUser();
  const { avatar }= logguedUser.moods[currentMood];
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

  const filteredConversations = useCallback(filterText => {
    if (!filterText) {
      setDatas(conversations);
      return;
    }

    const term = filterText.toLowerCase();
    const filtered = conversations.filter(item => {
      const { user1, user2 } = item;
      const target = user1.id === logguedUser.id ? user2 : user1;
      return target.firstName.toLowerCase().indexOf(term) >= 0;
    });
    setDatas(filtered);
    return;
  });

  useEffect(() => {
    filteredConversations(search);
  }, [search]);


  return (
    <View style={styles.container}>
      <PageHeader
        leftComponent={() => <Feather
          name="user"
          color="white"
          size={verticalScale(21)}
          onPress={() => NavigationHelper.navigate('MainTabsProfile')}
        />}
        rightComponent={() => <Feather
          name="more-vertical"
          color="white"
          size={verticalScale(21)}
          onPress={() => NavigationHelper.navigate('MainGlobalSettings')}
        />}
        title="MESSAGERIE"
      />
      <View style={{ alignItems: 'center' }}>
        <MoodSelector />
      </View>
      <Text style={styles.titleText}>
        {`Mes conversations ${TEXT[currentMood]}`}
      </Text>
      <View style={styles.searchBlock}>
        <SearchField
          placeholder="RECHERCHE PAR NOM D'UTILISATEUR..."
          lightTheme={true}
          onChangeText={(value) => setSearch(value)}
          value={search}
          containerStyle={styles.searchField}
          inputContainerStyle={styles.searchInner}
        />
      </View>
      <View style={styles.line} />
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        <FlatList
          contentContainerStyle={styles.flatListContent}
          data={datas}
          refreshing={areConversationsFetching}
          numColumns={3}
          refreshControl={(
            <RefreshControl
              refreshing={areConversationsFetching}
              onRefresh={fetchConversations}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
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
                <View style={{ alignItems: 'center' }}>
                  <Image
                    style={[styles.imageStyle, { borderColor: moodInfos.color }]}
                    uri={target.moods[currentMood].avatar}
                  />
                  <ImageButton
                    imageSource={COMPATIBILITY_SATIFAISANT}
                    imageStyle={styles.iconStyle}
                  />
                  {
                    hasNewMessage && (
                      <View style={[{ backgroundColor: moodInfos.color }, styles.messageCount]}>
                        <Text style={{ color: '#fff' }}>
                          {item[`${newMessageKey}unreadMessageCount`]}
                        </Text>
                      </View>
                    )
                  }
                  <View style={{ alignItems: 'center' }}>
                    <Text style={styles.messageNameList}>{target.firstName}</Text>
                    <Text style={styles.personnalityText} >
                      {target.personnalities.main}
                      {hasNewMessage}
                    </Text>
                  </View>
                  <View style={{ alignItems: 'center' }}>
                    <RoundButton
                      text="BIPOLARITY"
                      fontSize={4}
                      borderRadius={10}
                      width={100}
                      height={25}
                      onPress={() => NavigationHelper.navigate('MainTchatConversationBipolarity', {
                        opponent: target
                      })}
                    />
                  </View>
                </View>
                <View style={styles.body}>
                  <View style={styles.footer}>
                    {hasNewMessage && (
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
    </View>
  );
}

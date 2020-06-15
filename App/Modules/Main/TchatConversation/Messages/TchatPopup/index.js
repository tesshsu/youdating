import React, {
  useRef, useEffect, useState, useMemo, useCallback
} from 'react';
import {
  View,
  Text,
  Keyboard,
  ActivityIndicator,
  AppState,
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import ENV from '../../../../../environment';

import styles from './styles';
import useLogguedUser from '../../../../../Hooks/useLogguedUser';
import { MOODS } from '../../../../../GlobalConfig';
import useConversation from '../../../../../Hooks/useConversations';
import UtilsHelper from '../../../../../Helpers/UtilsHelper';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';
import MessageBubble from './MessageBubble';
import { verticalScale } from '../../../../../Helpers/ScaleHelper';

export default function TchatPopup() {
  const { activeConversation, addMessage, fetchMessages } = useConversation();

  const {
    mood,
    input,
    isFetching,
    target,
    messages,
    conversationID,
    uploads
  } = activeConversation;

  const moodInfos = MOODS[mood];
  const { logguedUser } = useLogguedUser();

  const socketRef = useRef();
  const isTypingRef = useRef(false);
  const scrollViewRef = useRef();
  const [targetIsTyping, setTargetIsTyping] = useState(false);

  useEffect(() => {
    socketRef.current = SocketIOClient(ENV.API_URL);

    socketRef.current.on('connection', () => {
      console.log('Socket connected!');
    });

    socketRef.current.on('typing', ({ isTyping }) => {
      setTargetIsTyping(isTyping);
    });

    socketRef.current.on('new-message', async ({ message, userKey }) => {
      if (message.author === target.id) {
        socketRef.current.emit('read-message', { conversationID, userKey });
        await addMessage(message);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log('Socket diconnected!');
      }
    };
  }, [addMessage, conversationID, target.id]);

  useEffect(() => {
    if (conversationID && socketRef.current) {
      socketRef.current.emit('join-conversation', { conversationID });
    }
  }, [conversationID]);

  useEffect(() => {
    if (input.length && isTypingRef.current === false && conversationID && socketRef.current) {
      socketRef.current.emit('typing', {
        conversationID,
        isTyping: true
      });

      isTypingRef.current = true;
    } else if (!input.length && isTypingRef.current === true && conversationID && socketRef.current) {
      socketRef.current.emit('typing', {
        conversationID,
        isTyping: false
      });

      isTypingRef.current = false;
    }
  }, [conversationID, input]);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardDidShow', () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd();
      }
    });


    return () => {
      keyboardWillShow.remove();
    };
  }, []);

  const [scrollData, lastMessageId] = useMemo(() => {
    let lastMessage = null;
    const data = messages.reduce((acc, message, index) => {
      const messageMoment = moment.unix(message.sentAt);

      if (index === 0) {
        acc.push({
          type: 'time-info',
          dateText: UtilsHelper.getDateText(messageMoment),
          timeText: messageMoment.format('HH:mm')
        });
      } else {
        const prevMessageMoment = moment.unix(messages[index - 1].sentAt);
        const isDayDifferent = messageMoment.get('dayOfYears') !== prevMessageMoment.get('dayOfYears');
        const isHourDifferent = isDayDifferent || (messageMoment.get('hour') !== prevMessageMoment.get('hour'));
        const isMinuteDifferent = isDayDifferent || (messageMoment.get('minutes') !== prevMessageMoment.get('minutes'));

        if (isDayDifferent || isHourDifferent || isMinuteDifferent) {
          acc.push({
            type: 'time-info',
            dateText: isDayDifferent ? UtilsHelper.getDateText(messageMoment) : null,
            timeText: messageMoment.format('HH:mm')
          });
        }
      }

      if (message.author !== logguedUser.id) {
        lastMessage = message;
      }

      acc.push({
        type: 'message',
        message
      });

      return acc;
    }, []);

    return [data, lastMessage && lastMessage.id];
  }, [logguedUser.id, messages]);

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => scrollViewRef.current.scrollToEnd({ animated: false }), 200);
    }
  }, [scrollViewRef, scrollData, targetIsTyping, uploads]);

  const onOpenPhoto = useCallback((photo) => {
    const allPhotos = messages.reduce((acc, curr) => {
      if (curr.imageUri && curr.imageUri !== '') {
        acc.push(curr.imageUri);
      }

      return acc;
    }, []);

    const index = allPhotos.indexOf(photo);
    NavigationHelper.navigate('MainPhotosGallerie', {
      photos: allPhotos,
      initialIndex: index,
      currentPhoto: allPhotos[index]
    });
  }, [messages]);

  const onAppStateFocus = useCallback(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    AppState.addEventListener('focus', onAppStateFocus);

    return () => {
      AppState.removeEventListener('focus', onAppStateFocus);
    };
  }, [fetchMessages, onAppStateFocus]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.conversationTitleText}>
          Conversation
        </Text>
        { isFetching && (
          <ActivityIndicator
            size="large"
            color={moodInfos.color}
          />
        )}
        { !isFetching && scrollData.map((data, index) => {
          if (data.type === 'time-info') {
            const { dateText, timeText } = data;
            return (
              <View key={index.toString()} style={[index > 0 && { marginTop: verticalScale(10) }]}>
                { dateText !== null && (
                  <Text style={styles.dateText}>
                    { dateText }
                  </Text>
                )}
                <Text
                  style={[
                    styles.timeText,
                    { color: moodInfos.color }
                  ]}
                >
                  { timeText }
                </Text>
              </View>
            );
          }

          const {
            id,
            author,
            content,
            imageUri,
            audioUri
          } = data.message;

          return (
            <MessageBubble
              index={id}
              avatarUri={id === lastMessageId ? target.moods[mood].avatar : null}
              containerStyle={author === logguedUser.id ? styles.bubbleAuthor : styles.bubbleTarget}
              text={content || ''}
              onOpenPhoto={onOpenPhoto}
              imageUri={imageUri}
              audioUri={audioUri}
            />
          );
        })}
        { targetIsTyping && (
          <MessageBubble
            key="typing"
            isTyping
            containerStyle={styles.bubbleTarget}
            avatarUri={target.moods[mood].avatar}
            text=""
          />
        )}
        { uploads.map(u => (
          <MessageBubble
            key={u.uploadId}
            text={u.content}
            containerStyle={styles.bubbleAuthor}
            uploadId={u.id}
            imageUri={u.type === 'image' ? u.uri : undefined}
          />
        ))}
      </ScrollView>
    </View>
  );
}

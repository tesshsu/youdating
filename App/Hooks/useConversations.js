import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useMemo, useEffect } from 'react';

import { Alert } from 'react-native';
import * as CONVERSATIONS_ACTIONS from '../Redux/actions/conversations';
import * as ACTIVE_CONVERSATIONS_ACTIONS from '../Redux/actions/activeConversation';
import NavigationHelper from '../Helpers/NavigationHelper';

export default function useConversation() {
  const activeConversation = useSelector(state => state.activeConversation);
  const { user } = useSelector(state => state.logguedUser);
  const currentMood = useSelector(state => state.currentMood);
  const allConversations = useSelector(state => state.conversations);
  const dispatch = useDispatch();

  const {
    isFetching: areConversationsFetching,
    conversations
  } = useMemo(() => allConversations[currentMood], [allConversations, currentMood]);

  const unreadMessagesCount = useMemo(
    () => allConversations[currentMood].conversations.reduce((acc, curr) => {
      const key = user.id === curr.user1.id ? 'user1' : 'user2';

      return acc + curr[`${key}unreadMessageCount`];
    }, 0), [allConversations, currentMood, user.id]
  );

  const sanitizedInput = useMemo(() => activeConversation.input.trim().replace(/ +/g, ' ').replace(/\n+/g, '\n'), [activeConversation.input]);

  const fetchMessages = useCallback(async () => {
    try {
      await dispatch(ACTIVE_CONVERSATIONS_ACTIONS.fetchMessages());
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de récupérer la liste des messages');
    }
  }, [dispatch]);

  const fetchConversation = useCallback(async (mood, conversationId) => {
    try {
      await dispatch(CONVERSATIONS_ACTIONS.fetchConversation(mood, conversationId));
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de récupérer la conversation');
    }
  }, [dispatch]);

  const fetchConversations = useCallback(async () => {
    try {
      await dispatch(CONVERSATIONS_ACTIONS.fetchConversations(currentMood));
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de récupérer la liste des conversations');
    }
  }, [dispatch, currentMood]);

  const startConversation = useCallback(async (mood, target) => {
    dispatch(ACTIVE_CONVERSATIONS_ACTIONS.startConversation(mood, target));
    NavigationHelper.navigate('MainTchatConversationMessages');
    await fetchMessages();
  }, [dispatch, fetchMessages]);

  const createMessage = useCallback(async () => {
    const { mood, target } = activeConversation;

    if (sanitizedInput === '') {
      setInputValue(sanitizedInput);
      return;
    }

    try {
      await dispatch(
        ACTIVE_CONVERSATIONS_ACTIONS.createMessage({
          mood,
          target: target.id,
          content: sanitizedInput
        })
      );
    } catch (err) {
      Alert.alert('Erreur', err.message);
    }
  }, [activeConversation, dispatch, sanitizedInput, setInputValue]);

  const addMessage = useCallback(async (message) => {
    try {
      await dispatch(
        ACTIVE_CONVERSATIONS_ACTIONS.addMessage(message)
      );
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de mettre à jour la conversation');
    }
  }, [dispatch]);

  const createUpload = useCallback(async (media) => {
    const { mood, target } = activeConversation;

    try {
      await dispatch(
        ACTIVE_CONVERSATIONS_ACTIONS.createUpload({
          media,
          mood,
          target: target.id,
          content: sanitizedInput
        })
      );
    } catch (err) {
      Alert.alert('Erreur', err.message);
    }
  }, [activeConversation, dispatch, sanitizedInput]);

  const setInputValue = useCallback((value) => {
    dispatch(ACTIVE_CONVERSATIONS_ACTIONS.setInputValue(value));
  }, [dispatch]);

  useEffect(() => {
    fetchConversations();
  }, [currentMood, fetchConversations]);

  return {
    sanitizedInput,
    areConversationsFetching,
    conversations,
    activeConversation,
    unreadMessagesCount,
    startConversation,
    fetchConversation,
    fetchConversations,
    fetchMessages,
    addMessage,
    createMessage,
    createUpload,
    setInputValue
  };
}

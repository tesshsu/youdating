import { useNavigationState } from 'react-navigation-hooks';
import { useCallback, useEffect, useState } from 'react';
import { Notifications } from 'expo';

import useNotifications from '../../Hooks/useNotifications';
import useGoodFeelings from '../../Hooks/useGoodFeelings';
import useCurrentMood from '../../Hooks/useCurrentMood';
import { useViews } from '../../Hooks/useViews';
import useConversation from '../../Hooks/useConversations';
import { MOODS } from '../../GlobalConfig';
import useVisitedProfil from '../../Hooks/useVisitedProfil';
import NavigationHelper from '../../Helpers/NavigationHelper';
import useLogguedUser from '../../Hooks/useLogguedUser';

const getActiveRouteState = (route) => {
  if (!route.routes || route.routes.length === 0 || route.index >= route.routes.length) {
    return route;
  }

  const childActiveRoute = route.routes[route.index];

  return getActiveRouteState(childActiveRoute);
};

export default function NotificationsListener() {
  const { showNotification } = useNotifications();
  const { logguedUser } = useLogguedUser();
  const { fetchAll: fetchGoodFeelings } = useGoodFeelings();
  const { fetchAll: fetchAllViews } = useViews();
  const {
    activeConversation,
    fetchConversation,
    conversations,
    startConversation
  } = useConversation();
  const navigationState = useNavigationState();
  const { visitProfil } = useVisitedProfil();
  const { setCurrentMood } = useCurrentMood();
  const [redirectToConversation, setRedirectToConversation] = useState(null);

  const {
    conversationID
  } = activeConversation;

  useEffect(() => {
    if (redirectToConversation) {
      console.log('REDIRECT TO CONVERSATION');
      const conversation = conversations.find(c => c.id === redirectToConversation);

      const {
        user1,
        user2,
        lastMessage
      } = conversation;

      const target = user1.id === logguedUser.id ? user2 : user1;

      if (lastMessage.isOpportunity && lastMessage.author !== logguedUser.id) {
        NavigationHelper.navigate('MainTchatNewMessage', { conversation, target });
      } else {
        startConversation(conversation.mood, target);
      }

      setRedirectToConversation(null);
    }
  }, [redirectToConversation, conversations, logguedUser, startConversation]);

  const notificationListener = useCallback(async (notif) => {
    let redirect = null;

    if (notif.data && notif.data.type === 'good-feeling') {
      await fetchGoodFeelings();

      redirect = async () => {
        setCurrentMood(notif.data.mood);
        await visitProfil(notif.data.visitProfil);
      };

      if (notif.origin === 'received') {
        showNotification({
          title: `MOOD ${MOODS[notif.data.mood].title}`,
          image: notif.data.avatar,
          duration: 4000,
          text: `👍 ${notif.data.firstName} vous a envoyé un good feeling!`,
          color: MOODS[notif.data.mood].color,
          onPress: redirect
        });
      } else {
        redirect();
      }
    }

    if (notif.data && notif.data.type === 'view') {
      await fetchAllViews();

      redirect = async () => {
        setCurrentMood(notif.data.mood);
        await visitProfil(notif.data.visitProfil);
      };

      if (notif.origin === 'received') {
        showNotification({
          title: `MOOD ${MOODS[notif.data.mood].title}`,
          image: notif.data.avatar,
          duration: 4000,
          text: `👀 ${notif.data.firstName} regarde votre profil!`,
          color: MOODS[notif.data.mood].color,
          onPress: redirect
        });
      } else {
        redirect();
      }
    }

    if (notif.data && notif.data.type === 'profil-unlocked') {
      if (notif.data.fetchGoodFeelings) {
        await fetchGoodFeelings();
      }

      redirect = async () => {
        setCurrentMood(notif.data.mood);
        await visitProfil(notif.data.visitProfil);
      };

      if (notif.origin === 'received') {
        showNotification({
          title: `MOOD ${MOODS[notif.data.mood].title}`,
          image: notif.data.avatar,
          duration: 4000,
          text: `🔑 Le profil de ${notif.data.firstName} à été débloqué!`,
          color: MOODS[notif.data.mood].color,
          onPress: redirect
        });
      } else if (notif.data.visitProfil) {
        redirect();
      }
    }

    if (notif.data && notif.data.type === 'new-message') {
      await fetchConversation(notif.data.mood, notif.data.conversationId);
      const routeState = getActiveRouteState(navigationState);
      const isOnConversationScreen = routeState && routeState.routeName === 'MainTchatConversationMessages';

      redirect = () => {
        setRedirectToConversation(notif.data.conversationId);
      };

      if (
        notif.origin === 'received'
        && (!isOnConversationScreen || notif.data.conversationId !== conversationID)
      ) {
        showNotification({
          title: `MOOD ${MOODS[notif.data.mood].title}`,
          image: notif.data.avatar,
          duration: 4000,
          text: `✉️ ${notif.data.firstName} vous a envoyé un message`,
          color: MOODS[notif.data.mood].color,
          onPress: redirect
        });
      } else if (!isOnConversationScreen || notif.data.conversationId !== conversationID) {
        redirect();
      }
    }
  }, [
    conversationID,
    fetchAllViews,
    fetchConversation,
    fetchGoodFeelings,
    navigationState,
    setCurrentMood,
    showNotification,
    visitProfil
  ]);

  useEffect(() => {
    const listener = Notifications.addListener(notificationListener);

    return () => listener.remove();
  }, [notificationListener]);

  return (null);
}

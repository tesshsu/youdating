import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { Audio } from 'expo-av';

import * as NOTIFICATIONS_ACTIONS from '../Redux/actions/notifications';

const NOTIFICATION_SOUND = require('../../assets/sounds/notification.mp3');

export default function useNotifications() {
  const notifications = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  const showNotification = useCallback(async ({
    type,
    IconProvider,
    iconName,
    iconSize,
    iconColor,
    title,
    text,
    image,
    duration,
    color,
    onPress
  }) => {
    dispatch(
      NOTIFICATIONS_ACTIONS
        .showNotification({
          type,
          IconProvider,
          iconName,
          iconSize,
          iconColor,
          title,
          text,
          image,
          duration,
          color,
          onPress
        })
    );

    try {
      await Audio.Sound.createAsync(
        NOTIFICATION_SOUND,
        { shouldPlay: true }
      );
    } catch (err) {
      console.warn(err);
    }
  }, [dispatch]);

  const hideNotification = useCallback(uid => dispatch(NOTIFICATIONS_ACTIONS.hideNotification(uid)), [dispatch]);

  return {
    notifications,
    showNotification,
    hideNotification
  };
}

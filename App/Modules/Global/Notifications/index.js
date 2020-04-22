import React, {
  useRef, useCallback, useLayoutEffect
} from 'react';
import { Transitioning, Transition } from 'react-native-reanimated';

import useNotifications from '../../../Hooks/useNotifications';
import Notification from './Notification';
import styles from './styles';

const transition = (
  <Transition.Sequence>
    <Transition.Out type="fade" durationMs={200} interpolation="easeInOut" />
    <Transition.Change interpolation="easeInOut" />
    <Transition.Together>
      <Transition.In type="slide-top" durationMs={200} interpolation="easeInOut" />
      <Transition.In type="fade" durationMs={200} interpolation="easeInOut" />
    </Transition.Together>
  </Transition.Sequence>
);

export default function Notifications() {
  const ref = useRef();
  const {
    notifications,
    hideNotification,
  } = useNotifications();

  useLayoutEffect(() => {
    ref.current.animateNextTransition();
  }, [notifications]);

  const onHideNotification = useCallback((uid) => {
    ref.current.animateNextTransition();
    hideNotification(uid);
  }, [hideNotification]);

  return (
    <Transitioning.View
      ref={ref}
      style={styles.container}
      transition={transition}
    >
      { notifications.map(n => (
        <Notification
          key={n.uid}
          {...n}
          onEnd={() => onHideNotification(n.uid)}
        />
      ))}
    </Transitioning.View>
  );
}

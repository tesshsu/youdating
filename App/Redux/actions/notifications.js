import uid from 'uid';

export const SHOW_NOTIFICATION = 'notifications/SHOW_NOTIFICIATION';
export const HIDE_NOTIFICATION = 'notifications/HIDE_NOTIFICIATION';

export function showNotification(notification) {
  return {
    type: SHOW_NOTIFICATION,
    payload: {
      ...notification,
      uid: uid()
    }
  };
}

export function hideNotification(id) {
  return {
    type: HIDE_NOTIFICATION,
    payload: {
      uid: id
    }
  };
}

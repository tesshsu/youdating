import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import * as API from '../Api';
import { ensurePermissions } from './PermissionsHelper';

export async function registerPushNotifications(userId) {
  try {
    await ensurePermissions(Permissions.NOTIFICATIONS);

    const token = await Notifications.getExpoPushTokenAsync();

    await API.User.updateDeviceToken(userId, Constants.installationId, token);
  } catch (err) {
    console.warn(err);
  }
}

export async function unregisterPushNotifications(userId) {
  try {
    await API.User.deleteDeviceToken(userId, Constants.installationId || '__DEV__');
  } catch (err) {
    console.warn(err);
  }
}

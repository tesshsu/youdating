import {
  Alert,
  Linking,
  Platform
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as IntentLauncher from 'expo-intent-launcher';


export async function openSettings() {
  if (Platform.OS === 'ios') {
    await Linking.openURL('app-settings:');
  } else {
    await IntentLauncher.startActivityAsync(IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS);
  }
}

export async function askPermission(...permissions) {
  const { granted } = await Permissions.askAsync(...permissions);

  return granted;
}

export function ensurePermissions(...permissions) {
  return new Promise(async (res, rej) => {
    if (!await askPermission(...permissions)) {
      return Alert.alert(
        'Permission refusée',
        'Vous avez refusé la permission',
        [
          {
            text: 'Modifier les permissions',
            style: 'default',
            onPress: async () => {
              await openSettings();

              if (await askPermission(...permissions)) {
                res();
              } else {
                rej();
              }
            }
          },
          {
            text: 'Annuler',
            style: 'cancel',
            onPress: () => {
              rej();
            }
          }
        ]
      );
    }

    return res();
  });
}

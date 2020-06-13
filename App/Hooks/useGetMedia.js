import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { useState } from 'react';
import { ensurePermissions } from '../Helpers/PermissionsHelper';
import useCurrentMood from './useCurrentMood';


function showActionSheet(options, showActionSheetWithOptions) {
  const {
    title,
    libraryText,
    cameraText,
    cancelText,
    tintColor,
    getMediaFromLibrary,
    getMediaFromCamera
  } = options;

  showActionSheetWithOptions({
    title,
    options: [libraryText, cameraText, cancelText],
    cancelButtonIndex: 2,
    tintColor
  },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        getMediaFromLibrary();
      } else if (buttonIndex === 1) {
        getMediaFromCamera();
      }
    });
}

const defaultUseGetMediaOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.All,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
  base64: true
};

const defaultGetMediaOptions = {
  title: 'Ajouter une photo',
  libraryText: 'Depuis votre librairie',
  cameraText: 'Prendre une photo',
  cancelText: 'Annuler'
};

export default function useGetMedia(useGetMediaOptions = {}) {
  const { moodInfos } = useCurrentMood();
  const [media, setMedia] = useState(null);
  const [error, setError] = useState(null);
  const { showActionSheetWithOptions } = useActionSheet();

  async function getMediaFromLibrary() {
    try {
      await ensurePermissions(Permissions.CAMERA_ROLL);
    } catch (err) {
      return;
    }

    try {
      const {
        cancelled,
        ...result
      } = await ImagePicker.launchImageLibraryAsync({
        ...defaultUseGetMediaOptions,
        ...useGetMediaOptions
      });

      if (cancelled) {
        return;
      }

      setMedia(result);
    } catch (err) {
      setError(err);
    }
  }

  async function getMediaFromCamera() {
    try {
      await ensurePermissions(Permissions.CAMERA);
    } catch (err) {
      return;
    }

    try {
      const {
        cancelled,
        ...result
      } = await ImagePicker.launchCameraAsync({
        ...defaultUseGetMediaOptions,
        ...useGetMediaOptions,
      });

      if (cancelled) {
        return;
      }

      setMedia(result);
    } catch (err) {
      setError(err);
    }
  }

  function getMedia(options = {}) {
    showActionSheet({
      ...defaultGetMediaOptions,
      ...options,
      tintColor: moodInfos.color,
      getMediaFromLibrary,
      getMediaFromCamera
    }, showActionSheetWithOptions);
  }

  function deleteMedia() {
    setMedia(null);
  }

  return {
    getMedia,
    getMediaFromLibrary,
    getMediaFromCamera,
    deleteMedia,
    media,
    error
  };
}
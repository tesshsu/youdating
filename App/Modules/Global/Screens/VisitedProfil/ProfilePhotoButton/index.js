import React, { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { MediaTypeOptions } from 'expo-image-picker';


import useGetMedia from '../../../../../../Hooks/useGetMedia';
import useLogguedUser from '../../../../../../Hooks/useLogguedUser';

const mediaOptions = {
  mediaTypes: MediaTypeOptions.Images
};

export default function ProfilePhotoButton() {
  const {
    getMedia,
    media,
    error,
    deleteMedia
  } = useGetMedia(mediaOptions);
  const { logguedUser, updateLogguedUser } = useLogguedUser();

  useEffect(() => {
    if (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue.');
    }
  }, [error]);

  useEffect(() => {
    if (media) {
      const { uri } = media;

      deleteMedia();
      updateLogguedUser({ ...logguedUser, avatar: { uri } });
    }
  }, [
    media,
    deleteMedia,
    updateLogguedUser,
    logguedUser
  ]);

  return (
    <Feather
      name="instagram"
      color="white"
      onPress={getMedia}
      size={28}
    />
  );
}

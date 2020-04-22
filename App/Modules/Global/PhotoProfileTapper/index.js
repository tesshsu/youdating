import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { MediaTypeOptions } from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useGetMedia from '../../../Hooks/useGetMedia';
import useLogguedUser from '../../../Hooks/useLogguedUser';
import useCurrentMood from '../../../Hooks/useCurrentMood';

const mediaOptions = {
  mediaTypes: MediaTypeOptions.Images
};

export default function PhotoProfileTapper(props) {
  const { children } = props;
  const {
    getMedia,
    media,
    error,
    deleteMedia
  } = useGetMedia(mediaOptions);
  const { currentMood } = useCurrentMood();
  const { logguedUser, updateLogguedUser, uploadAvatar } = useLogguedUser();

  useEffect(() => {
    if (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue.');
    }
  }, [error]);

  useEffect(() => {
    if (media) {
      deleteMedia();
      uploadAvatar(media, currentMood);
      // updateLogguedUser({ ...logguedUser, avatar: { uri } });
    }
  }, [media, deleteMedia, updateLogguedUser, logguedUser, uploadAvatar, currentMood]);

  return (
    <TouchableOpacity onPress={getMedia}>
      { children }
    </TouchableOpacity>
  );
}

PhotoProfileTapper.propTypes = {
  children: PropTypes.element.isRequired
};

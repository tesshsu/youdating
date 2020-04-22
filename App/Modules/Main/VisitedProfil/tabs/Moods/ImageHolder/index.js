import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import ActionSheet from 'react-native-action-sheet';
import {
  ImageBackground,
  TouchableOpacity,
  Alert,
  ViewPropTypes
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MediaTypeOptions } from 'expo-image-picker';

import styles from './styles';
import useCurrentMood from '../../../../../../Hooks/useCurrentMood';
import useGetMedia from '../../../../../../Hooks/useGetMedia';
import useLogguedUser from '../../../../../../Hooks/useLogguedUser';
import useUploads from '../../../../../../Hooks/useUploads';

const mediaOptions = {
  mediaTypes: MediaTypeOptions.Images,
  quality: 0.6
};

export default function ImageHolder(props) {
  const {
    containerStyle,
    imageUri,
    canUpload,
    onOpenPhoto
  } = props;

  const {
    media,
    error,
    getMedia,
    deleteMedia
  } = useGetMedia(mediaOptions);
  const { currentMood, moodInfos } = useCurrentMood();
  const { addPhoto, removePhoto } = useLogguedUser();
  const { getUploadById } = useUploads();

  useEffect(() => {
    if (media) {
      addPhoto(media, currentMood);
      deleteMedia();
    }
  }, [media, addPhoto, currentMood, deleteMedia]);

  useEffect(() => {
    if (error) {
      Alert.alert('Erreur', error);
    }
  }, [error]);


  const upload = getUploadById(`upload-photo-${currentMood}`);

  function cancelUpload() {
    ActionSheet.showActionSheetWithOptions({
      title: 'Téléchargement en cours...',
      options: ['Annuler le téléchargement', 'Annuler'],
      destructiveButtonIndex: 0,
      cancelButtonIndex: 1,
      tintColor: moodInfos.color
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        if (upload && upload.cancel) {
          upload.cancel();
        }
      }
    });
  }

  function photoActions() {
    ActionSheet.showActionSheetWithOptions({
      title: 'Que voulez vous faire ?',
      options: ['Voir la photo', 'Supprimer la photo', 'Annuler'],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 2,
      tintColor: moodInfos.color
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        onOpenPhoto(imageUri);
      } else if (buttonIndex === 1) {
        removePhoto(imageUri, currentMood);
      }
    });
  }

  function onPress() {
    if (upload) {
      cancelUpload();
    } else if (imageUri) {
      onOpenPhoto(imageUri);
    } else {
      getMedia();
    }
  }

  function onLongPress() {
    if (imageUri) {
      photoActions();
    }
  }

  const uri = useMemo(() => {
    if (upload && canUpload) {
      return { uri: upload.uri };
    }

    if (imageUri) {
      return { uri: imageUri };
    }

    return null;
  }, [upload, canUpload, imageUri]);

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        styles.container,
        containerStyle
      ]}
    >
      <ImageBackground
        style={[
          styles.imageBackground,
        ]}
        source={uri}
        imageStyle={styles.image}
      >
        { !uri && (
          <Feather
            name="plus"
            color="white"
            size={40}
          />
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
}

ImageHolder.propTypes = {
  imageUri: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  canUpload: PropTypes.bool,
  onOpenPhoto: PropTypes.func
};

ImageHolder.defaultProps = {
  imageUri: null,
  containerStyle: {},
  canUpload: true,
  onOpenPhoto: null
};

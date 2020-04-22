import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  TouchableOpacity,
  Alert,
  ViewPropTypes
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import ActionSheet from 'react-native-action-sheet';

import styles from './styles';
import useCurrentMood from '../../../../../../Hooks/useCurrentMood';
import useGetMedia from '../../../../../../Hooks/useGetMedia';
import useLogguedUser from '../../../../../../Hooks/useLogguedUser';

export default function ImageHolder(props) {
  const {
    containerStyle,
    imageUri
  } = props;

  const [uri, setUri] = useState(imageUri);
  const {
    media,
    error,
    getMedia,
    deleteMedia
  } = useGetMedia();
  const { moodInfos } = useCurrentMood();
  const { logguedUser, updateLogguedUser } = useLogguedUser();

  function handleOnPress() {
    if (uri === null) {
      getMedia();
    } else {
      ActionSheet.showActionSheetWithOptions({
        title: 'Que voulez vous faire ?',
        options: ['Modifier la photo', 'Supprimer la photo', 'Anuler'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
        tintColor: moodInfos.color,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          getMedia();
        } else if (buttonIndex === 1) {
          const index = logguedUser.profilePhotos.indexOf(logguedUser.profilePhotos);
          logguedUser.profilePhotos.splice(index);
          const { profilePhotos } = logguedUser;

          updateLogguedUser({
            ...logguedUser,
            profilePhotos
          });
        }
      });
    }
  }

  useEffect(() => {
    if (media) {
      updateLogguedUser({
        ...logguedUser,
        profilePhotos: [
          ...logguedUser.profilePhotos,
          media.uri
        ]
      });
      deleteMedia();
    }
  }, [media, logguedUser, updateLogguedUser, deleteMedia]);

  useEffect(() => {
    if (error) {
      Alert.alert('Erreur', error);
    }
  }, [error]);

  useEffect(() => {
    setUri(imageUri);
  }, [imageUri]);

  return (
    <TouchableOpacity
      onPress={handleOnPress}
      style={[
        styles.container,
        containerStyle
      ]}
    >
      <ImageBackground
        style={[
          styles.imageBackground,
          { borderColor: moodInfos.color }
        ]}
        source={uri ? { uri } : null}
        imageStyle={styles.image}
      >
        { !uri && (
          <Feather
            name="plus"
            color={moodInfos.color}
            size={40}
          />
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
}

ImageHolder.propTypes = {
  imageUri: PropTypes.string,
  containerStyle: ViewPropTypes.style
};

ImageHolder.defaultProps = {
  imageUri: null,
  containerStyle: {}
};

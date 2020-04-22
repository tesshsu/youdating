import React from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MediaTypeOptions } from 'expo-image-picker';
import { Image } from 'react-native-expo-image-cache';

import styles from './styles';
import { verticalScale } from '../../../../../../Helpers/ScaleHelper';
import CircularProgress from '../../../../../Global/CircularProgress';
import PhotoUploadButton from '../../../../../Global/PhotoUploadButton';
import useCurrentMood from '../../../../../../Hooks/useCurrentMood';

const mediaOptions = {
  mediaTypes: MediaTypeOptions.Images,
  quality: 0.6
};

export default function StickyAvatarButton(props) {
  const {
    onMedia,
    imageSource
  } = props;

  const { moodInfos, currentMood } = useCurrentMood();

  function renderUpload(upload, onCancelUpload) {
    return (
      <ImageBackground
        style={styles.photoButtonUploadContainer}
        imageStyle={[styles.avatar, { borderColor: moodInfos.color }]}
      >
        <CircularProgress
          containerStyle={styles.photoButtonUploadProgressContainer}
          size={verticalScale(25)}
          strokeWidth={2}
          color={moodInfos.color}
          progress={upload.progress}
        />
        <View>
          <Feather
            name="x"
            color={moodInfos.color}
            size={verticalScale(20)}
            onPress={onCancelUpload}
          />
        </View>
      </ImageBackground>
    );
  }

  return (
    <PhotoUploadButton
      uploadId={`upload-avatar-${currentMood}`}
      mediaOptions={mediaOptions}
      onMedia={onMedia}
      renderUpload={renderUpload}
    >
      <View style={styles.stickerHeaderImageContainer}>
        <Image uri={imageSource} style={[styles.avatar, { borderColor: moodInfos.color }]} />
      </View>
    </PhotoUploadButton>
  );
}

StickyAvatarButton.propTypes = {
  onMedia: PropTypes.func.isRequired,
  imageSource: PropTypes.oneOfType([
    PropTypes.shape({ uri: PropTypes.string.isRequired }),
    PropTypes.node.isRequired
  ]).isRequired
};

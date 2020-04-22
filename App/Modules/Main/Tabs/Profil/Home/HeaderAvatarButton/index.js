import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MediaTypeOptions } from 'expo-image-picker';

import styles from './styles';
import { verticalScale } from '../../../../../../Helpers/ScaleHelper';
import CircularProgress from '../../../../../Global/CircularProgress';
import PhotoUploadButton from '../../../../../Global/PhotoUploadButton';
import useCurrentMood from '../../../../../../Hooks/useCurrentMood';

const mediaOptions = {
  mediaTypes: MediaTypeOptions.Images,
  quality: 0.6
};

export default function HeaderAvatarButton(props) {
  const {
    onMedia,
  } = props;

  const { moodInfos, currentMood } = useCurrentMood();

  function renderUpload(upload, onCancelUpload) {
    return (
      <View style={styles.photoButtonUploadContainer}>
        <CircularProgress
          containerStyle={styles.photoButtonUploadProgressContainer}
          size={verticalScale(28)}
          strokeWidth={2}
          color="white"
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
      </View>
    );
  }

  return (
    <PhotoUploadButton
      uploadId={`upload-avatar-${currentMood}`}
      mediaOptions={mediaOptions}
      onMedia={onMedia}
      renderUpload={renderUpload}
    >
      <Feather
        name="instagram"
        color={moodInfos.color}
        size={verticalScale(25)}
      />
    </PhotoUploadButton>
  );
}

HeaderAvatarButton.propTypes = {
  onMedia: PropTypes.func.isRequired,
};

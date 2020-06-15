import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, ViewPropTypes, View, ActivityIndicator
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SharedElement } from 'react-native-shared-element';
import { Image } from 'react-native-expo-image-cache';

import styles from './styles';
import useUploads from '../../../../../../Hooks/useUploads';
import AnimatedDots from '../AnimatedDots';
import AudioButton from '../../../../../Global/AudioButton';
import { scale, verticalScale } from '../../../../../../Helpers/ScaleHelper';


export default function MessageBubble(props) {
  const {
    containerStyle,
    isTyping,
    text,
    imageUri,
    avatarUri,
    onOpenPhoto,
    audioUri,
    uploadId
  } = props;

  const { getUploadById } = useUploads();
  const upload = getUploadById(uploadId) || null;

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        {avatarUri !== null && (
          <Image style={styles.avatar} uri={avatarUri} />
        )}
        {isTyping && (
          <AnimatedDots dotsColor="black" />
        )}
        {imageUri !== null && (
          <TouchableOpacity onPress={() => onOpenPhoto(imageUri)}>
            <SharedElement key={imageUri} id={imageUri}>
              <Image style={styles.messageImage} uri={imageUri} />
            </SharedElement>
          </TouchableOpacity>
        )}
        {audioUri && (
          <AudioButton
            key="audio-button"
            iconSize={verticalScale(20)}
            size={verticalScale(30)}
            uri={audioUri}
            // color={moodInfos.color}
            backgroundColor="white"
          />
        )}
        {imageUri !== null && text !== '' && <View style={styles.spacer} />}
        {text !== '' && <Text style={[styles.text]}>{text}</Text>}
      </View>
      {upload !== null && (
        <View style={styles.status}>
          <ActivityIndicator size="small" color="black" />
          <Text
            style={styles.statusText}
          >
            {upload === null ? 'Envoyé' : `${upload.progress}%`}
          </Text>
        </View>
      )}
    </>
  );
}

MessageBubble.defaultProps = {
  containerStyle: {},
  isTyping: false,
  text: null,
  imageUri: null,
  avatarUri: null,
  onOpenPhoto: () => { },
  uploadId: null
};

MessageBubble.propTypes = {
  containerStyle: ViewPropTypes.style,
  isTyping: PropTypes.bool,
  text: PropTypes.string,
  imageUri: PropTypes.string,
  avatarUri: PropTypes.string,
  onOpenPhoto: PropTypes.func,
  uploadId: PropTypes.string,
  audioUri: PropTypes.string
};

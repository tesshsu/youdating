import React, {
  useState, useEffect, useMemo
} from 'react';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { MediaTypeOptions } from 'expo-image-picker';
import {
  View, Image, ActivityIndicator
} from 'react-native';

import styles from './styles';
import RoundIconButton from '../../../../Global/RoundIconButton';
import { verticalScale, scale } from '../../../../../Helpers/ScaleHelper';
import { MOODS } from '../../../../../GlobalConfig';
import useConversation from '../../../../../Hooks/useConversations';
import useGetMedia from '../../../../../Hooks/useGetMedia';
import Panel from './Panel';
import AudioUri from './AudioRecorder';
import AudioButton from '../../../../Global/AudioButton';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';
const mediaOptions = {
  mediaTypes: MediaTypeOptions.Images,
  quality: 0.6
};

export default function MessageComposer(props) {
  const {
    onImage,
  } = props;
  const [inputHeight, setInputHeight] = useState(0);
  const {
    activeConversation, createMessage, createUpload, setInputValue
  } = useConversation();
  const {
    getMedia, media, deleteMedia
  } = useGetMedia(mediaOptions);
  const [mediaInfos, setMediaInfos] = useState(null);

  const { mood, input, isSending } = activeConversation;

  const moodInfos = MOODS[mood];

  useEffect(() => {
    if (media) {
      setMediaInfos({ type: 'image', ...media });
      deleteMedia();
    }
  }, [deleteMedia, media, onImage]);

  function onSendMessage() {
    if (mediaInfos) {
      createUpload({ ...mediaInfos });
    } else {
      createMessage();
    }

    closePanel();
  }

  function closePanel() {
    setMediaInfos(null);
  }

  const panelTitle = useMemo(() => {
    if (!mediaInfos) {
      return '';
    }

    return mediaInfos.type === 'image' ? 'ENVOYER UNE IMAGE' : 'ENVOYER UN MESSAGE VOCAL';
  }, [mediaInfos]);

  return (
    <>
      <Panel
        title={panelTitle}
        color={moodInfos.color}
        onClose={closePanel}
      >
        { mediaInfos !== null && mediaInfos.type === 'image' && (
          <Image
            key="media-image"
            style={styles.mediaImage}
            source={{ uri: mediaInfos.uri }}
          />
        )}
        { mediaInfos !== null && mediaInfos.type === 'audio' && (
          <AudioButton
            key="audio-button"
            iconSize={verticalScale(40)}
            size={verticalScale(80)}
            uri={mediaInfos.uri}
            color={moodInfos.color}
            backgroundColor="white"
          />
        )}
      </Panel>
      <View
        style={[
          styles.composer,
          { backgroundColor: moodInfos.color }
        ]}
      >
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              { color: moodInfos.color }
            ]}
            editable={!isSending}
            multiline
            //underlineColorAndroid="transparent"
            value={input}
            blurOnSubmit={false}
            onContentSizeChange={({ nativeEvent }) => setInputHeight(nativeEvent.contentSize.height)}
            onChangeText={setInputValue}
          />
          <View style={styles.sendButtonContainer}>
            { !isSending && (
              <RoundIconButton
                iconName="arrow-up"
                iconColor="white"
                iconSize={verticalScale(12)}
                size={verticalScale(20)}
                iconContainerStyle={{
                  transform: [
                    { translateX: scale(0.5) },
                    { translateY: -verticalScale(2) },
                  ]
                }}
                onPress={onSendMessage}
                backgroundColor={moodInfos.color}
              />
            )}
            { isSending && (
              <ActivityIndicator
                size="small"
                color={moodInfos.color}
              />
            )}
          </View>
        </View>
        <Feather
          style={styles.icon}
          name="instagram"
          size={verticalScale(20)}
          color="white"
          onPress={getMedia}
        />
        <AudioUri/>
        <Feather
          style={styles.icon}
          name="users"
          size={verticalScale(20)}
          color="white"
          onPress={() => NavigationHelper.navigate('MainTchatConversationBipolarity')}
        />
      </View>
    </>
  );
}

MessageComposer.propTypes = {
  onImage: PropTypes.func.isRequired
};

import React, {
  useState, useRef, useCallback
} from 'react';
import { Audio } from 'expo-av';
import PropTypes from 'prop-types';
import { Alert, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useTimingTransition, useValues } from 'react-native-redash';
import CircularProgressIcon from '../CircularProgressIcon';
import { verticalScale } from '../../../Helpers/ScaleHelper';

export default function AudioButton(props) {
  const {
    uri,
    backgroundColor,
    color,
    size,
    iconSize
  } = props;

  const soundRef = useRef();
  const timeOutRef = useRef();
  const [isLoading, setIsLoading] = useState(0);
  const [isLoaded, setIsLoaded] = useState(0);
  const [isPlaying, setIsPlaying] = useState(0);
  const [duration, setDuration] = useState(null);

  const [animatedDuration] = useValues([
    0
  ], []);

  const progress = useTimingTransition(isPlaying, { duration: animatedDuration });

  const onPlaybackStatusUpdate = useCallback((status) => {
    if (!duration && status.durationMillis) {
      setDuration(status.durationMillis);
    }

    if (
      !isLoaded
      && status.isLoaded
    ) {
      setIsLoading(false);
      setIsLoaded(true);
    }
  }, [duration, isLoaded]);

  const loadSound = useCallback(async () => {
    setIsLoading(true);

    try {
      const { sound } = await Audio.Sound.createAsync({ uri }, {
        shouldPlay: false,
        volume: 1
      }, onPlaybackStatusUpdate, true);
      soundRef.current = sound;
    } catch (err) {
      console.warn(err);
      Alert.alert('Erreur', 'Impossible de charger le son');
      setIsLoading(false);
    }
  }, [onPlaybackStatusUpdate, uri]);

  const playSound = useCallback(async () => {
    if (soundRef.current) {
      try {
        animatedDuration.setValue(duration);
        setIsPlaying(true);
        await soundRef.current.playAsync();
        timeOutRef.current = setTimeout(stopSound, duration);
      } catch (err) {
        setIsPlaying(false);
        console.warn(err);
        Alert.alert('Erreur', 'Erreur lors de la lecture du son');
      }
    }
  }, [animatedDuration, duration, stopSound]);

  const stopSound = useCallback(async () => {
    if (soundRef.current) {
      try {
        animatedDuration.setValue(0);
        setIsPlaying(false);
        await soundRef.current.stopAsync();
      } catch (err) {
        console.warn(err);
        Alert.alert('Erreur', 'Erreur lors de l\'arrêt du son');
      }
    }
  }, [animatedDuration]);

  const handlePress = useCallback(async () => {
    if (!isLoaded) {
      loadSound();
    } else if (isPlaying) {
      stopSound();
    } else {
      playSound();
    }
  }, [isLoaded, isPlaying, loadSound, playSound, stopSound]);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={color}
      />
    );
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <CircularProgressIcon
        iconName={isPlaying ? 'square' : 'play'}
        iconColor={color}
        backgroundColor={backgroundColor}
        color={color}
        progress={progress}
        iconSize={iconSize || (size / 2)}
        size={size}
        strokeWidth={verticalScale(2)}
      />
    </TouchableOpacity>
  );
}

AudioButton.defaultProps = {
  iconSize: null
};

AudioButton.propTypes = {
  uri: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  iconSize: PropTypes.number,
  size: PropTypes.number.isRequired
};

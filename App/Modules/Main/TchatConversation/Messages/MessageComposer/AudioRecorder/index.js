/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect, useRef, useMemo
} from 'react';
import PropTypes from 'prop-types';
import { View, Alert } from 'react-native';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Audio } from 'expo-av';

import {
  onGestureEvent, useValues
} from 'react-native-redash';

import { Feather } from '@expo/vector-icons';
import styles from './styles';
import { verticalScale } from '../../../../../../Helpers/ScaleHelper';

const {
  eq,
  neq,
  and,
  cond,
  set,
  useCode,
  call,
  debug,
  block,
} = Animated;

export default function AudioRecorder(props) {
  const {
    onUri,
    onRecordingChange
  } = props;

  const recordingRef = useRef();
  const timeoutRef = useRef();

  const [
    state,
    isRecording,
  ] = useValues([
    State.UNDETERMINED,
    0,
  ], []);

  const gestureHandler = useMemo(() => onGestureEvent({
    state
  }), []);

  const shouldStartRecord = and(eq(state, State.BEGAN), eq(isRecording, 0));
  const shouldEndRecord = and(neq(state, State.BEGAN), eq(isRecording, 1));

  useCode(() => block([
    debug('shoulStartRecord', shouldStartRecord),
    cond(
      eq(shouldStartRecord, 1),
      [
        set(isRecording, 1),
        call([], () => startRecord()),
      ]
    ),
    cond(
      eq(shouldEndRecord, 1),
      [
        call([], () => stopRecord()),
      ]
    ),
  ]), []);

  async function init() {
    recordingRef.current = new Audio.Recording();

    try {
      await recordingRef.current.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    } catch (err) {
      console.warn(err);
      Alert.alert('Erreur', 'Impossible de préparer l\'enregistrement!');
    }
  }

  async function unload() {
    if (recordingRef.current) {
      try {
        await recordingRef.current.stopAndUnloadAsync();
      } catch (err) {
        console.warn(err);
        Alert.alert('Erreur', 'Impossible de décharger l\'enregistrement!');
      }
    }
  }

  async function startRecord() {
    if (recordingRef.current) {
      try {
        timeoutRef.current = setTimeout(() => {
          stopRecord();
        }, 20000);
        onRecordingChange(true);
        await recordingRef.current.startAsync();
      } catch (err) {
        console.warn(err);
        Alert.alert('Erreur', 'Impossible de démarrer l\'enregistrement!');
      }
    }
  }

  async function stopRecord() {
    if (recordingRef.current) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      try {
        onRecordingChange(false);

        await recordingRef.current.stopAndUnloadAsync();
        const uri = recordingRef.current.getURI();
        state.setValue(State.UNDETERMINED);
        isRecording.setValue(0);
        onUri(uri);
        await init();
      } catch (err) {
        console.warn(err);
        Alert.alert('Erreur', 'Impossible de récupérer le son!');
      } finally {
        isRecording.setValue(0);
        state.setValue(State.UNDETERMINED);
      }
    }
  }

  useEffect(() => {
    init();

    return () => {
      unload();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TapGestureHandler {...gestureHandler}>
        <Animated.View>
          <Feather
            name="mic"
            size={verticalScale(20)}
            color="white"
          />
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
}

AudioRecorder.propTypes = {
  onRecordingChange: PropTypes.func.isRequired,
  onUri: PropTypes.func.isRequired
};

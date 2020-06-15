import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { useCallback, useEffect, useRef, useState } from 'react';

export const recorder = () => {
  const recordingRef = useRef();
  const recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));
  const [recordingState, setRecordingState] = useState({
    isRecording: false,
    soundRecorded: null,
    recordingDuration: 0
  });

  useEffect(() => {
    return () => {
      recordingRef.current = null;
    }
  }, [recordingRef]);

  const initAndRecord = useCallback(async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });

    /*if (recordingRef.current !== null) {
      await recordingRef.current.setOnRecordingStatusUpdate(null);
      recordingRef.current = null;
    }*/

    const rec = await new Audio.Recording();
    await rec.prepareToRecordAsync(recordingSettings);
    // rec.setProgressUpdateInterval(1000);
    rec.setOnRecordingStatusUpdate(_updateScreenForRecordingStatus);

    recordingRef.current = rec;
    await recordingRef.current.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
  });

  const stopRec = useCallback(async () => {
    try {
      await recordingRef.current.stopAndUnloadAsync();
    } catch (error) {
      console.log('stop err', error);
      // Do nothing -- we are already unloaded.
    }
  });

  const resetRecorder = useCallback(() => {
    setRecordingState({
      isRecording: false,
      soundRecorded: null,
      recordingDuration: 0
    });
    recordingRef.current.setOnRecordingStatusUpdate(null);
    recordingRef.current = null;
  });

  async function _updateScreenForRecordingStatus(status) {
    if (status.canRecord) {
      setRecordingState({
        ...recordingState,
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      setRecordingState({
        ...recordingState,
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
    }
  }

  const handleRecord = async () => {
    if (recordingState.isRecording) {
      await stopRec();
      const info = await FileSystem.getInfoAsync(recordingRef.current.getURI());
      setRecordingState({ ...recordingState, isRecording: false, soundRecorded: info });
    } else {
      await initAndRecord();
    }
  };

  return {
    handleRecord,
    recordingState,
    resetRecorder
  }

  // return (
  //   <View style={styles.container}>
  //     <TouchableOpacity onPress={() => handleRecord()}>
  //       <Feather
  //         name="mic"
  //         size={verticalScale(20)}
  //         color={recordingState.isRecording ? 'red' : 'white'}
  //       />
  //     </TouchableOpacity>
  //   </View>
  // );
}

export default recorder;
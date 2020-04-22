import React from 'react';
import {
  View, ActivityIndicator, Text
} from 'react-native';
import Animated from 'react-native-reanimated';

import styles from './styles';
import useLoadingOverlay from '../../../Hooks/useLoadingOverlay';
import useCurrentMood from '../../../Hooks/useCurrentMood';

export default function LoadingOverlay() {
  const { isVisible, text } = useLoadingOverlay();
  const { moodInfos } = useCurrentMood();

  if (!isVisible) {
    return (null);
  }

  return (
    <View
      style={styles.container}
    >
      <Animated.View style={[styles.modal]}>
        <ActivityIndicator
          color={moodInfos ? moodInfos.color : 'black'}
          size="large"
        />
        { text !== null && (
          <Text
            style={[
              styles.loadingText,
              { color: moodInfos ? moodInfos.color : 'black' }
            ]}
          >
            { text }
          </Text>
        )}
      </Animated.View>
    </View>
  );
}

import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, SafeAreaView
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import * as IconProviders from '@expo/vector-icons';
import {
  onGestureEvent, withSpring, useValues
} from 'react-native-redash';
import { PanGestureHandler, State, TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import styles, { HEIGHT } from './styles';
import { verticalScale } from '../../../../Helpers/ScaleHelper';

const {
  interpolate,
  Extrapolate,
} = Animated;

const {
  diffClamp
} = Animated;

export default function Notification(props) {
  const {
    type,
    image,
    IconProvider,
    iconName,
    iconColor,
    iconSize,
    title,
    text,
    color,
    duration,
    onEnd,
    onPress
  } = props;

  useEffect(() => {
    if (duration > 0) {
      setTimeout(onEnd, duration);
    }
  }, [duration, onEnd]);

  const [
    state,
    translationY,
    velocityY
  ] = useValues([
    State.UNDETERMINED,
    0,
    0,
  ], []);

  const gestureHandler = onGestureEvent({
    state,
    translationY,
    velocityY
  });

  const spring = withSpring({
    value: diffClamp(translationY, -HEIGHT, 0),
    velocity: velocityY,
    state,
    config: {
      mass: 1,
      damping: 15,
      overshootClamping: false,
      stiffness: 150,
      restDisplacementThreshold: 0.1,
      restSpeedThreshold: 0.1
    },
    snapPoints: [0, -HEIGHT],
    onSnap: (offset) => {
      if (offset === -HEIGHT) {
        handlePress();
      }
    }
  });

  const translateY = interpolate(spring, {
    inputRange: [-HEIGHT, 0],
    outputRange: [-HEIGHT, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const opacity = interpolate(translateY, {
    inputRange: [-HEIGHT, 0],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });

  const handlePress = useCallback(() => {
    onEnd();
    if (onPress) {
      onPress();
    }
  }, [onEnd, onPress]);

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={[styles.notificationContainer, { transform: [{ translateY }], opacity }]}>
        <SafeAreaView />
        <TouchableOpacity onPress={handlePress} style={[styles.notification, { borderColor: color }]}>
          { type === 'image' && (
            <Image
              style={styles.image}
              uri={image}
            />
          )}
          { type === 'icon' && (
            <IconProvider
              name={iconName}
              color={iconColor}
              size={iconSize}
            />
          )}
          <View style={styles.content}>
            <Text style={[styles.titleText, { color }]}>{ title }</Text>
            <Text style={[styles.bodyText]}>{ text }</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
}

Notification.defaultProps = {
  type: 'image',
  iconProvider: IconProviders.Feather,
  iconName: 'question-mark',
  iconColor: 'black',
  iconSize: verticalScale(18),
  color: 'black',
  image: null,
  onPress: null,
  duration: 0,
};

Notification.propTypes = {
  type: PropTypes.oneOf(['image', 'icon']),
  image: PropTypes.string,
  iconProvider: PropTypes.oneOf(Object.values(IconProviders)),
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  duration: PropTypes.number,
  onEnd: PropTypes.func.isRequired,
  onPress: PropTypes.func
};

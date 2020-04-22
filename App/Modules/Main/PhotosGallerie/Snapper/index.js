import React from 'react';
import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  useValues, onGestureEvent, snapPoint, timing
} from 'react-native-redash';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import styles from './styles';
import NavigationHelper from '../../../../Helpers/NavigationHelper';
import { verticalScale } from '../../../../Helpers/ScaleHelper';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');
const SNAP_BACK = WINDOW_HEIGHT / 4;

const {
  interpolate,
  Extrapolate,
  useCode,
  block,
  cond,
  and,
  not,
  eq,
  set,
  call,
  diffClamp
} = Animated;

export default function Snapper({ children }) {
  const [
    translationY,
    velocityY,
    translationX,
    velocityX,
    state,
    translateX,
    translateY,
    shouldSnapback
  ] = useValues([
    0,
    0,
    0,
    0,
    State.UNDETERMINED,
    0,
    0,
    0
  ], []);

  const snapTo = snapPoint(translationY, velocityY, [0, SNAP_BACK]);

  const gestureEvent = onGestureEvent({
    translationY,
    velocityY,
    translationX,
    velocityX,
    state
  });

  function goBack() {
    NavigationHelper.back();
  }

  useCode(() => block([
    cond(and(not(shouldSnapback), eq(snapTo, SNAP_BACK), eq(state, State.END)), set(shouldSnapback, 1)),
    cond(
      shouldSnapback,
      call([], goBack),
      cond(eq(state, State.END), [
        set(translateY, timing({ from: translateY, to: 0 })),
        set(translateX, timing({ from: translateX, to: 0 }))
      ], [
        set(translateX, translationX),
        set(translateY, diffClamp(translationY, 0, SNAP_BACK))
      ])
    )
  ]), []);

  const scale = interpolate(translateY, {
    inputRange: [0, SNAP_BACK],
    outputRange: [1, 0.8],
    extrapolate: Extrapolate.CLAMP
  });

  const borderRadius = interpolate(translateY, {
    inputRange: [0, SNAP_BACK],
    outputRange: [0, verticalScale(15)],
    extrapolate: Extrapolate.CLAMP
  });

  return (
    <PanGestureHandler {...gestureEvent}>
      <Animated.View
        style={[
          styles.container,
          {
            borderRadius,
            transform:
              [
                { translateX, translateY },
                { scale }
              ]
          }
        ]}
      >
        { children }
      </Animated.View>
    </PanGestureHandler>
  );
}

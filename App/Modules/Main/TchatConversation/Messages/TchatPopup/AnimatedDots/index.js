import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Animated, { Easing } from 'react-native-reanimated';
import { View } from 'react-native';
import { useValues } from 'react-native-redash';

import styles from './styles';

const {
  block,
  timing,
  cond,
  eq,
  set,
  useCode,
  clockRunning,
  not,
  startClock,
  Clock,
  Extrapolate,
  interpolate
} = Animated;

function runTiming(clock) {
  const state = {
    finished: new Animated.Value(0),
    position: new Animated.Value(0),
    frameTime: new Animated.Value(0),
    time: new Animated.Value(0)
  };

  const config = {
    toValue: new Animated.Value(1),
    duration: 1000,
    easing: Easing.linear
  };

  return block([
    timing(clock, state, config),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(config.toValue, cond(eq(state.position, 1), 0, 1))
    ]),
    state.position
  ]);
}


export default function AnimatedDots(props) {
  const {
    dotsColor
  } = props;

  const dots = [0, 1, 2];
  const delta = 1 / dots.length;
  const clock = useMemo(() => new Clock(), []);
  const [progress] = useValues([0], []);

  useCode(
    () => block([
      cond(not(clockRunning(clock)), startClock(clock)),
      cond(clockRunning(clock), set(progress, runTiming(clock)))
    ]),
    []
  );

  return (
    <View style={styles.dotsContainer}>
      { dots.map((d, i) => {
        const start = i * delta;
        const end = start + delta;

        const scale = interpolate(progress, {
          inputRange: [start, end],
          outputRange: [1, 1.5],
          extrapolate: Extrapolate.CLAMP
        });

        const transform = [{ scale }];

        return (
          <Animated.View
            key={i.toString()}
            style={[
              styles.dot, {
                transform,
                backgroundColor: dotsColor
              }
            ]}
          />
        );
      })}
    </View>
  );
}

AnimatedDots.propTypes = {
  dotsColor: PropTypes.string.isRequired
};

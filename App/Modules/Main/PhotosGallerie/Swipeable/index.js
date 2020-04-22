/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useValues, onGestureEvent, withSpring } from 'react-native-redash';

const {
  useCode,
  block,
  set,
  cond,
  eq,
} = Animated;

export default function Swipeable(props) {
  const {
    translateX,
    offset,
    isScrolling,
    snapPoints,
    onSnap,
    children
  } = props;

  const [
    translationX,
    velocityX,
    state
  ] = useValues([
    0,
    0,
    State.UNDETERMINED
  ], []);

  const panGestureHandler = useMemo(() => onGestureEvent({
    translationX,
    velocityX,
    state,
  }), []);

  const x = withSpring({
    value: translationX,
    velocity: velocityX,
    offset,
    state,
    config: {
      mass: 2,
      overshootClamping: true,
      damping: 40,
      stiffness: 300
    },
    snapPoints,
    onSnap
  });

  useCode(() => block([
    set(translateX, x),
    set(isScrolling, cond(eq(state, State.BEGAN), 1)),
    set(isScrolling, cond(eq(state, State.END), 0))
  ]), []);

  return (
    <PanGestureHandler {...panGestureHandler}>
      { children }
    </PanGestureHandler>
  );
}

Swipeable.propTypes = {
  translateX: PropTypes.instanceOf(Animated.Value).isRequired,
  offset: PropTypes.instanceOf(Animated.Value).isRequired,
  isScrolling: PropTypes.instanceOf(Animated.Value).isRequired,
  snapPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
  onSnap: PropTypes.func.isRequired,
};

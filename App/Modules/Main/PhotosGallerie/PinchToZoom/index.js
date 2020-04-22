import React from 'react';
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import {
  onGestureEvent, Vector, transformOrigin, timing, useValues, translate
} from 'react-native-redash';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import { useMemoOne } from 'use-memo-one';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

const {
  useCode,
  cond,
  eq,
  set,
  block,
  max,
} = Animated;

export default function PinchToZoom({ children }) {
  const translation = useMemoOne(() => Vector.create(0, 0), []);
  const focal = useMemoOne(() => Vector.create(0, 0), []);
  const origin = useMemoOne(() => Vector.create(0, 0), []);

  const [state, rawScale, scale] = useValues([
    State.UNDETERMINED,
    1,
    1
  ], []);

  const gestureHandler = useMemoOne(() => onGestureEvent({
    state,
    scale: rawScale,
    focalX: focal.x,
    focalY: focal.y
  }), []);

  const adjustedFocal = useMemoOne(() => Vector.add({ x: -WINDOW_WIDTH / 2, y: -WINDOW_WIDTH / 2 }, focal), []);

  useCode(() => block([
    cond(eq(state, State.BEGAN), Vector.set(origin, adjustedFocal)),
    cond(eq(state, State.ACTIVE), Vector.set(translation, Vector.invert(Vector.sub(origin, adjustedFocal)))),
    cond(eq(state, State.END), [
      set(scale, timing({ from: max(rawScale, 1), to: 1 })),
      set(translation.x, timing({ from: translation.x, to: 0 })),
      set(translation.y, timing({ from: translation.y, to: 0 })),
    ], set(scale, max(rawScale, 1)))
  ]), [translation, adjustedFocal, origin, state]);

  return (
    <PinchGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          transform: [
            ...translate(translation),
            ...transformOrigin(origin, { scale }),
          ]
        }}
      >
        { children }
      </Animated.View>
    </PinchGestureHandler>
  );
}

PinchToZoom.propTypes = {
  reScale: PropTypes.instanceOf(Animated.Value).isRequired
};

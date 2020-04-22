import React, { Children } from 'react';
import PropTypes from 'prop-types';

import Animated, { Easing } from 'react-native-reanimated';
import { bInterpolate, useTransition } from 'react-native-redash';

const {
  concat,
  interpolate,
  Extrapolate
} = Animated;

export default function DropDown({
  isToggled,
  children,
  childHeight,
  direction
}) {
  const progress = useTransition(isToggled, { duration: 400, easing: Easing.ease });
  const scale = bInterpolate(progress, 0.8, 1);
  const pointerEvents = interpolate(progress, {
    inputRange: [0.9, 1],
    outputRange: [concat('none'), concat('auto')],
    extrapolate: Extrapolate.CLAMP
  });

  return (
    <>
      { Children.map(children, (child, index) => {
        const delta = (direction === 'up' ? children.length - index : index) + 1;
        const translate = childHeight * children.length * delta * (direction === 'up' ? 1 : -1);
        const translateY = bInterpolate(progress, translate, 0);

        return (
          <Animated.View
            key={index.toString()}
            style={{ transform: [{ translateY, scale }], opacity: progress }}
            pointerEvents={pointerEvents}
          >
            { child }
          </Animated.View>
        );
      })}
    </>
  );
}

DropDown.defaultProps = {
  direction: 'up'
};

DropDown.propTypes = {
  isToggled: PropTypes.bool.isRequired,
  childHeight: PropTypes.number.isRequired,
  direction: PropTypes.oneOf(['up', 'down'])
};

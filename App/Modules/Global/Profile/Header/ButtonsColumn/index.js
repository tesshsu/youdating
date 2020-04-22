import React, { useState } from 'react';

import Animated from 'react-native-reanimated';

import styles from './styles';
import { verticalScale } from '../../../../../Helpers/ScaleHelper';

const {
  interpolate,
  Extrapolate
} = Animated;

const defaultLayout = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};

const mapToLayout = children => children.map(() => ({ ...defaultLayout }));
const extractLayout = ({
  nativeEvent: {
    layout
  }
}) => ({ ...layout });

export default function ButtonsColumn({
  containerStyle, children, scrollY, right
}) {
  const [columnLayout, setColumnLayout] = useState({ ...defaultLayout });
  const [layouts, setLayouts] = useState(mapToLayout(children));

  function onLayout(ev, index) {
    layouts[index] = extractLayout(ev);
    setLayouts([...layouts]);
  }

  return (
    <Animated.View
      onLayout={ev => setColumnLayout(extractLayout(ev))}
      style={[
        styles.container,
        containerStyle,
      ]}
    >
      { React.Children.map(children, (child, index) => {
        const {
          x, y, width, height
        } = layouts[index];
        const startInput = verticalScale(400) - (columnLayout.y + y + height + verticalScale(50));
        const endInput = verticalScale(400) - (columnLayout.y + y + height);
        const translateX = interpolate(scrollY, {
          inputRange: [startInput < 0 ? 0 : startInput, endInput],
          outputRange: [0, (x + width + columnLayout.x) * (right ? 1 : -1)],
          extrapolate: Extrapolate.CLAMP
        });

        return (
          <Animated.View
            key={index.toString()}
            onLayout={ev => onLayout(ev, index)}
            style={{ transform: [{ translateX }] }}
          >
            { child }
          </Animated.View>
        );
      })}
    </Animated.View>
  );
}

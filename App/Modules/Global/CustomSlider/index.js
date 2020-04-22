import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { useMemoOne } from 'use-memo-one';
import { useValues, onGestureEvent, withSpring } from 'react-native-redash';
import { State, PanGestureHandler } from 'react-native-gesture-handler';

import styles, { SLIDER_WIDTH, THUMB_WIDTH } from './styles';
import useCurrentMood from '../../../Hooks/useCurrentMood';

const {
  interpolate,
  Extrapolate
} = Animated;

export default function CustomSlider(props) {
  const {
    value,
    min,
    max,
    step,
    containerStyle,
    labels,
    onValueChange,
    disabled
  } = props;

  const { moodInfos } = useCurrentMood();
  const [labelWidths, setLabelWidths] = useState([]);
  const [translationX, velocityX, offset, state] = useValues([0, 0, 0, State.UNDETERMINED], []);

  const gestureEvent = useMemoOne(() => onGestureEvent({
    translationX,
    velocityX,
    state
  }), []);

  const snapPoints = useMemoOne(() => {
    const delta = max - min;
    const nbSteps = (delta / step);

    return new Array(nbSteps).fill(0).map((_, i) => i * (SLIDER_WIDTH / nbSteps));
  }, [min, max, step]);

  const getOffsetValue = useCallback((val) => {
    const delta = max - min;
    return SLIDER_WIDTH / delta * val;
  }, [max, min]);

  const x = useMemoOne(() => withSpring({
    value: translationX,
    velocity: velocityX,
    state,
    offset,
    config: {
      mass: 2,
      overshootClamping: true,
      damping: 40,
      stiffness: 300
    },
    snapPoints,
    onSnap: ([position]) => {
      const delta = max - min;
      const ratio = delta / SLIDER_WIDTH;

      onValueChange(Math.round(position * ratio));
    }
  }), [max, min, snapPoints]);

  const translateX = useMemoOne(() => interpolate(x, {
    inputRange: [0, SLIDER_WIDTH],
    outputRange: [-(THUMB_WIDTH / 2), SLIDER_WIDTH - (THUMB_WIDTH / 2)],
    extrapolate: Extrapolate.CLAMP
  }), []);

  const barWidth = useMemoOne(() => interpolate(x, {
    inputRange: [0, SLIDER_WIDTH],
    outputRange: [0, SLIDER_WIDTH],
    extrapolate: Extrapolate.CLAMP
  }), []);


  const setLabelWidth = useCallback((index, ev) => {
    const { width } = ev.nativeEvent.layout;

    labelWidths[index] = width;
    setLabelWidths([...labelWidths]);
  }, [labelWidths]);

  useEffect(() => {
    offset.setValue(getOffsetValue(value));
  }, [value, getOffsetValue, offset]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.bar} />
      <Animated.View style={[styles.bar, { backgroundColor: moodInfos.color, width: barWidth }]} />
      { labels.map((l, index) => (
        <Animated.View
          key={index.toString()}
          onLayout={ev => setLabelWidth(index, ev)}
          style={[
            styles.label,
            {
              left: getOffsetValue(l.value),
              transform: [{ translateX: labelWidths[index] ? -(labelWidths[index] / 2) : 0 }]
            }
          ]}
        >
          <View style={styles.labelBar} />
          <Text style={styles.labelText}>{ l.label }</Text>
        </Animated.View>
      ))}
      <PanGestureHandler {...gestureEvent} enabled={!disabled}>
        <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
      </PanGestureHandler>
    </View>
  );
}

CustomSlider.defaultProps = {
  containerStyle: {},
  labels: [],
  disabled: false
};

CustomSlider.propTypes = {
  containerStyle: ViewPropTypes.style,
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ),
  onValueChange: PropTypes.func.isRequired
};

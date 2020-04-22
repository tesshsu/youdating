import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect
} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  View
} from 'react-native';

import styles from './styles';

const SCREEN_WIDTH = Dimensions.get('screen').width;

function createPanResponder(translateX, endGesture, shouldSetPanResponder) {
  return PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponder: shouldSetPanResponder,
    onPanResponderTerminationRequest: () => false,
    onPanResponderMove: Animated.event([null, { dx: translateX }]),
    onPanResponderRelease: endGesture,
    onPanResponderTerminate: () => null,
    onShouldBlockNativeReponser: () => true
  });
}

export default function Carousel({ children, activeIndex }) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(activeIndex || 0);

  const shouldSetPanResponder = useCallback(
    (_, gestureState) => (gestureState.dx < -3 && currentIndex < children.length - 1)
      || (gestureState.dx > 3 && currentIndex > 0),
    [currentIndex, children]
  );

  const animateToValue = useCallback((toValue, duration, cb) => {
    Animated.timing(translateX, {
      toValue,
      duration,
      useNativeDriver: true
    }).start(() => {
      if (cb) {
        cb();
      }
    });
  }, [translateX]);

  const endGesture = useCallback((_, gestureState) => {
    if (Math.abs(gestureState.dx) < SCREEN_WIDTH / 3) {
      animateToValue(0, 200);
    } else if (gestureState.dx < 0) {
      animateToValue(-SCREEN_WIDTH, 200, () => {
        translateX.setValue(0);
        setCurrentIndex(currentIndex === children.length - 1 ? 0 : currentIndex + 1);
      });
    } else {
      animateToValue(SCREEN_WIDTH, 200, () => {
        translateX.setValue(0);
        setCurrentIndex(currentIndex === 0 ? children.length - 1 : currentIndex - 1);
      });
    }
  }, [
    children,
    currentIndex,
    setCurrentIndex,
    animateToValue,
    translateX,
  ]);

  const panResponder = useMemo(
    () => createPanResponder(translateX, endGesture, shouldSetPanResponder),
    [translateX, endGesture, shouldSetPanResponder]
  );

  useEffect(() => {
    if (activeIndex !== null && typeof activeIndex !== 'undefined') {
      setCurrentIndex(activeIndex);
    }
  }, [activeIndex]);

  return (
    <View {...panResponder.panHandlers} style={styles.container}>
      <Animated.View
        style={[
          styles.innerContainer,
          { left: currentIndex === 0 ? 0 : (currentIndex * SCREEN_WIDTH * -1) },
          { transform: [{ translateX }] }
        ]}
      >
        { React.Children.map(children, c => (c))}
      </Animated.View>
    </View>
  );
}

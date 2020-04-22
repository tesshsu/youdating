import React from 'react';
import PropTypes from 'prop-types';
import Svg, { Circle } from 'react-native-svg';
import { useValues } from 'react-native-redash';
import Animated from 'react-native-reanimated';
import { ViewPropTypes, View } from 'react-native';

const {
  useCode,
  set,
  interpolate,
  multiply,
} = Animated;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function CircularProgress(props) {
  const {
    size,
    progress,
    strokeWidth,
    color,
    containerStyle
  } = props;

  const [progressValue] = useValues([0], []);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useCode(() => set(progressValue, progress), [progress]);

  const alpha = interpolate(progress, {
    inputRange: [0, 100],
    outputRange: [0, Math.PI * 2]
  });

  const strokeDashoffset = multiply(alpha, radius);

  return (
    <View style={containerStyle}>
      <Svg width={size} height={size}>
        <AnimatedCircle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
    </View>
  );
}

CircularProgress.defaultProps = {
  containerStyle: {}
};

CircularProgress.propTypes = {
  containerStyle: ViewPropTypes.style,
  size: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired
};

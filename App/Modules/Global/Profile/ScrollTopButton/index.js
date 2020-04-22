import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import { withTransition } from 'react-native-redash';

import styles from './styles';
import RoundIconButton from '../../RoundIconButton';
import { verticalScale } from '../../../../Helpers/ScaleHelper';
import useCurrentMood from '../../../../Hooks/useCurrentMood';

const {
  interpolate,
  Extrapolate
} = Animated;

export default function ScrollTopButton(props) {
  const {
    isToggled,
    onPress
  } = props;

  const { moodInfos } = useCurrentMood();
  const transition = useMemo(() => withTransition(isToggled), [isToggled]);

  const scale = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0.6, 1],
    extrapolate: Extrapolate.CLAMP
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: transition,
          transform: [{ scale }]
        }
      ]}
    >
      <RoundIconButton
        iconName="arrow-up"
        iconSize={verticalScale(20)}
        iconColor="white"
        backgroundColor={moodInfos.color}
        size={verticalScale(40)}
        onPress={onPress}
      />
    </Animated.View>
  );
}

ScrollTopButton.propTypes = {
  isToggled: PropTypes.instanceOf(Animated.Value).isRequired,
  onPress: PropTypes.func.isRequired
};

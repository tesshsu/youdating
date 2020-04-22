import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, StatusBar } from 'react-native';
import { onScrollEvent } from 'react-native-redash';
import Animated from 'react-native-reanimated';

import styles from './styles';
import { HEADER_HEIGHT } from '../Header/styles';
import { verticalScale } from '../../../../Helpers/ScaleHelper';

const {
  useCode,
  set,
  cond,
  greaterOrEq,
  lessThan,
  and,
  eq,
  call
} = Animated;

export default function ProfileScrollView(props) {
  const {
    scrollViewRef,
    scrollY,
    isToggled,
    children
  } = props;

  function toggleStatusBar([shouldToggleDark]) {
    StatusBar.setBarStyle(shouldToggleDark ? 'dark-content' : 'light-content', true);
  }

  useCode(() => cond(
    and(
      greaterOrEq(
        scrollY,
        HEADER_HEIGHT - verticalScale(40)
      ),
      eq(isToggled, 0)
    ),
    [set(isToggled, 1), call([isToggled], toggleStatusBar)],
    cond(
      and(
        lessThan(
          scrollY,
          HEADER_HEIGHT - verticalScale(40)
        ),
        eq(isToggled, 1)
      ),
      [set(isToggled, 0), call([isToggled], toggleStatusBar)]
    )
  ), [isToggled]);

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      style={StyleSheet.absoluteFill}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
      onScroll={onScrollEvent({ y: scrollY })}
      scrollEventThrottle={1}
    >
      <View style={{ height: HEADER_HEIGHT }} />
      { children }
    </Animated.ScrollView>
  );
}

ProfileScrollView.propTypes = {
  scrollY: PropTypes.instanceOf(Animated.Value).isRequired,
  isToggled: PropTypes.instanceOf(Animated.Value).isRequired,
  scrollViewRef: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line no-undef
    PropTypes.shape({ current: PropTypes.instanceOf(Animated.ScrollView) })
  ]).isRequired
};

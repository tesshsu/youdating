import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import { withTransition } from 'react-native-redash';


import {
  SafeAreaView, View, Text
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';
import MoodSelector from '../../MoodSelector';
import { MOOD_SELECTOR_HEIGHT } from '../../MoodSelector/styles';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import NavigationHelper from '../../../../Helpers/NavigationHelper';
import { verticalScale } from '../../../../Helpers/ScaleHelper';

const {
  interpolate, Extrapolate
} = Animated;

export default function StickyHeader(props) {
  const {
    isToggled,
    ImageComponent,
    firstName,
    personnality
  } = props;

  const { moodInfos } = useCurrentMood();
  const [headerHeight, setHeaderHeight] = useState(1000);

  const translationY = useMemo(() => withTransition(isToggled, { duration: 400 }), [isToggled]);

  const translateY = interpolate(translationY, {
    inputRange: [0, 1],
    outputRange: [headerHeight * -1, 0],
    extrapolate: Extrapolate.CLAMP
  });

  const moodSelectorOpacity = interpolate(translationY, {
    inputRange: [0.3, 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  });

  function onLayout(ev) {
    const { height } = ev.nativeEvent.layout;

    setHeaderHeight(height + MOOD_SELECTOR_HEIGHT / 2);
  }

  return (
    <Animated.View
      onLayout={onLayout}
      style={[styles.container, {
        transform: [{ translateY }]
      }]}
    >
      <SafeAreaView />
      <View style={styles.innerContainer}>
        { ImageComponent }
        <View style={styles.userInfos}>
          <Text style={[styles.usernameText, { color: moodInfos.color }]}>{ firstName }</Text>
          <Text style={styles.personnalityText}>{ personnality }</Text>
        </View>
        <Feather
          name="more-vertical"
          color={moodInfos.color}
          size={verticalScale(28)}
          onPress={() => NavigationHelper.navigate('MainGlobalSettings')}
        />
      </View>
      <Animated.View style={[styles.moodSelectorContainer, { opacity: moodSelectorOpacity }]}>
        <View style={styles.shadow}>
          <MoodSelector containerStyle={styles.moodSelector} />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

StickyHeader.propTypes = {
  isToggled: PropTypes.instanceOf(Animated.Value).isRequired,
  //ImageComponent: PropTypes.element.isRequired,
  personnality: PropTypes.string.isRequired
};

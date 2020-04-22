import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  I18nManager,
  SafeAreaView,
} from 'react-native';
import Animated from 'react-native-reanimated';

import styles from './styles';
import useCurrentMood from '../../../../Hooks/useCurrentMood';

const SCREEN_WIDTH = Dimensions.get('screen').width;

export default function TabBar(props) {
  const {
    navigationState,
    position,
    onIndexChange,
    labelStyle
  } = props;
  const { moodInfos } = useCurrentMood();


  function getTranslateX(routes) {
    const { interpolate, Extrapolate, multiply } = Animated;
    const inputRange = routes.map((_, i) => i);

    const outputRange = routes.reduce((acc, _, i) => {
      if (i === 0) return [0];
      return [...acc, acc[i - 1] + (SCREEN_WIDTH / navigationState.routes.length)];
    }, []);

    const translateX = interpolate(position, {
      inputRange,
      outputRange,
      extrapolate: Extrapolate.CLAMP,
    });

    return multiply(translateX, I18nManager.isRTL ? -1 : 1);
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.floatingBar,
            {
              width: SCREEN_WIDTH / navigationState.routes.length,
              backgroundColor: moodInfos.color,
              transform: [
                { translateX: getTranslateX(navigationState.routes) }
              ]
            }
          ]}
        />
        { navigationState.routes.map((route, i) => (
          <TouchableOpacity
            key={route.title}
            style={styles.tab}
            onPress={() => onIndexChange(i)}
          >
            <Text
              style={[
                styles.tabLabel,
                navigationState.index === i && { color: moodInfos.color },
                labelStyle
              ]}
            >
              { route.title }
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

TabBar.defaultProps = {
  labelStyle: {}
};

TabBar.propTypes = {
  labelStyle: Text.propTypes.style
};

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

import { MOODS } from '../../../../GlobalConfig';
import styles from './styles';
import useCurrentMood from '../../../../Hooks/useCurrentMood';

export default function TabBar(props) {
  const {
    renderIcon,
    getLabelText,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation,
  } = props;

  const { currentMood } = useCurrentMood();

  const {
    routes,
    index: activeRouteIndex
  } = navigation.state;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          { routes.map((route, routeIndex) => {
            if (routeIndex === 0 && currentMood === 'PERSO') {
              return (null);
            }

            const isRouteActive = routeIndex === activeRouteIndex;
            const tintColor = isRouteActive ? MOODS[currentMood].color : '#7E7E7E';

            return (
              <TouchableOpacity
                // eslint-disable-next-line react/no-array-index-key
                key={routeIndex}
                onPress={() => onTabPress({ route })}
                onLongPress={() => onTabLongPress({ route })}
                accessibilityLabel={getAccessibilityLabel({ route })}
                style={[
                  styles.tabContainer,
                ]}
              >
                { renderIcon({ route, focused: isRouteActive, tintColor }) }
                <Text
                  style={[
                    styles.text,
                    isRouteActive && styles.textActive,
                    { color: tintColor }
                  ]}
                >
                  { getLabelText({ route }) }
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

import React from 'react';
import {
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import {
  Feather,
} from '@expo/vector-icons';

import { MOODS } from '../../../../../GlobalConfig';
import styles from './styles';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';

export default function ActionButton({
  text,
  primary,
  IconProvider,
  iconName,
  onPress,
}) {
  const { currentMood } = useCurrentMood();

  const { color } = MOODS[currentMood];

  const Icon = IconProvider || Feather;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: primary ? color : 'white' }
        ]}
      >
        <Icon
          name={iconName}
          size={20}
          color={primary ? 'white' : MOODS[currentMood].color}
        />
      </View>
      <Text
        style={styles.text}
      >
        { text }
      </Text>
    </TouchableOpacity>
  );
}

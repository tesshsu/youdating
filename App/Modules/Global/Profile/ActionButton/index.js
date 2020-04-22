import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  Feather,
} from '@expo/vector-icons';

import styles from './styles';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import { verticalScale } from '../../../../Helpers/ScaleHelper';
import RoundIconButton from '../../RoundIconButton';

export default function ActionButton({
  text,
  primary,
  IconProvider,
  iconName,
  onPress,
  iconOffset
}) {
  const { moodInfos } = useCurrentMood();

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <RoundIconButton
        backgroundColor={primary ? moodInfos.color : 'white'}
        onPress={onPress}
        IconProvider={IconProvider || Feather}
        iconSize={verticalScale(16)}
        iconName={iconName}
        iconColor={primary ? 'white' : moodInfos.color}
        size={verticalScale(38)}
        containerStyle={styles.iconContainer}
        iconContainerStyle={{
          paddingLeft: (iconOffset && iconOffset.x) ? iconOffset.x : 0,
          paddingTop: (iconOffset && iconOffset.y) ? iconOffset.y : 0
        }}
      />
      <Text
        style={styles.text}
      >
        { text }
      </Text>
    </TouchableOpacity>
  );
}

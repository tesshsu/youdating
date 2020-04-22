import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import useCurrentMood from '../../../../../../Hooks/useCurrentMood';
import { verticalScale } from '../../../../../../Helpers/ScaleHelper';

export default function CheckLine({
  label,
  checked,
  onPress
}) {
  const { moodInfos } = useCurrentMood();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.labelText}>{ label }</Text>
      { checked && (
        <Feather
          name="check-circle"
          size={verticalScale(20)}
          color={moodInfos.color}
        />
      )}
    </TouchableOpacity>
  );
}

CheckLine.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired
};

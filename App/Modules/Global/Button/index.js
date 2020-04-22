import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Text
} from 'react-native';

import styles from './styles';
import useCurrentMood from '../../../Hooks/useCurrentMood';

export default function Button(props) {
  const {
    text,
    onPress,
    disabled
  } = props;
  const { moodInfos } = useCurrentMood();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        disabled && { opacity: 0.6 }
      ]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          { color: moodInfos.color }
        ]}
      >
        { text }
      </Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  disabled: false
};

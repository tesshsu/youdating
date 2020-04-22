import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  ViewPropTypes
} from 'react-native';

import styles from './styles';

export default function AuthentificationButton(props) {
  const {
    text,
    onPress,
    containerStyle,
    disabled
  } = props;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        containerStyle,
        disabled && { opacity: 0.6 }
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{ text }</Text>
    </TouchableOpacity>
  );
}

AuthentificationButton.propTypes = {
  containerStyle: ViewPropTypes.style,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

AuthentificationButton.defaultProps = {
  containerStyle: {},
  disabled: false
};

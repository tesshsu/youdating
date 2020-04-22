import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import useCurrentMood from '../../../Hooks/useCurrentMood';
import { moderateScale } from '../../../Helpers/ScaleHelper';

export default function RoundButton(props) {
  const {
    backgroundColor,
    containerStyle,
    disabled,
    onPress,
    uppercase,
    text,
    width,
    height,
    borderRadius,
    chevronRight
  } = props;

  const { moodInfos } = useCurrentMood();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: backgroundColor || moodInfos.color },
        { width, height, borderRadius },
        containerStyle
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          uppercase && { textTransform: 'uppercase' }
        ]}
      >
        { text }
      </Text>
      { chevronRight !== null && (
        <Feather
          style={styles.chevronLeft}
          name="chevron-right"
          size={moderateScale(15)}
          color="white"
        />
      ) }
    </TouchableOpacity>
  );
}

RoundButton.propTypes = {
  backgroundColor: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
  uppercase: PropTypes.bool,
  text: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  borderRadius: PropTypes.number.isRequired,
  chevronRight: PropTypes.bool
};

RoundButton.defaultProps = {
  backgroundColor: null,
  containerStyle: {},
  disabled: false,
  onPress: null,
  uppercase: false,
  width: null,
  height: null,
  chevronRight: null
};

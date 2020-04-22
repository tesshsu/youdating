import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ViewPropTypes } from 'react-native';
import { Feather } from '@expo/vector-icons';


import styles from './styles';
import { verticalScale } from '../../../Helpers/ScaleHelper';
import useCurrentMood from '../../../Hooks/useCurrentMood';

export default function Badge(props) {
  const { moodInfos } = useCurrentMood();

  const {
    type,
    value,
    iconName,
    iconSize,
    size,
    backgroundColor,
    disabled,
    color,
    textStyle,
    badgeContainerStyle,
    children
  } = props;

  return (
    <View style={styles.container}>
      { children }
      { !disabled && (
        <View
          style={[
            styles.badgeContainer,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor
            },
            badgeContainerStyle
          ]}
        >
          { type === 'icon' && (
            <Feather
              name={iconName}
              size={iconSize}
              color={color || moodInfos.color}
            />
          )}

          { type === 'value' && (
            <Text style={[{ color: color || moodInfos.color }, textStyle]}>
              { value }
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

Badge.defaultProps = {
  value: 0,
  iconName: 'question-mark',
  iconSize: verticalScale(12),
  size: verticalScale(18),
  backgroundColor: 'white',
  color: null,
  textStyle: {},
  badgeContainerStyle: {},
  disabled: false
};

Badge.propTypes = {
  type: PropTypes.oneOf(['icon', 'value']).isRequired,
  value: PropTypes.number,
  badgeContainerStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  size: PropTypes.number,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  disabled: PropTypes.bool
};

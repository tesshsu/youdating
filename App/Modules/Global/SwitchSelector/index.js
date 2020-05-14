/* eslint-disable react/forbid-prop-types */
import React, {
  useRef, useCallback, useEffect, useState
} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  ViewPropTypes,
  View,
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import styles from './styles';
import { verticalScale } from '../../../Helpers/ScaleHelper';

export default function SwitchText(props) {
  const textInputRef = useRef();
  const {
    label,
    buttonColor,
    options,
    onPress,
    style,
    error
  } = props;

  return (
    <View style={style}>
      { label !== null && (
        <Text style={styles.labelText}>{ label }</Text>
      )}
      <SwitchSelector
        buttonColor={buttonColor}
        options={options} 
        initial={0} 
        onPress={onPress} 
      />
      { error && (
        <Text style={styles.errorText}>{ error }</Text>
      )}
    </View>
  );
}

SwitchText.propTypes = {
  buttonColor: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.any,
  style: PropTypes.any,
  error: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

SwitchText.defaultProps = {
  buttonColor: null,
  label: '#ffcede',
  options: {},
  style: {},
  error: null
};

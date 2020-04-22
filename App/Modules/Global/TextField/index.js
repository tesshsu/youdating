/* eslint-disable react/forbid-prop-types */
import React, {
  useRef, useCallback, useEffect, useState
} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  ViewPropTypes,
  TouchableOpacity,
} from 'react-native';

import styles from './styles';
import { verticalScale } from '../../../Helpers/ScaleHelper';

export default function TextField(props) {
  const textInputRef = useRef();
  const [offsetY, setOffsetY] = useState(0);
  const {
    label,
    textInputProps,
    containerStyle,
    onRef,
    autofocus,
    error,
    scrollViewRef
  } = props;

  const focus = useCallback(() => {
    textInputRef.current.focus();
    if (scrollViewRef && scrollViewRef.current && offsetY > 0) {
      scrollViewRef.current.scrollTo({ y: offsetY });
    }
  }, [offsetY, scrollViewRef]);

  useEffect(() => {
    if (autofocus) {
      focus();
    }
  }, [autofocus, focus]);

  const onLayout = useCallback((ev) => {
    const { y } = ev.nativeEvent.layout;
    setOffsetY(y - verticalScale(20));
  }, []);

  return (
    <TouchableOpacity
      onLayout={onLayout}
      onPress={focus}
      style={[
        styles.container,
        containerStyle
      ]}
    >
      { label !== null && (
        <Text style={styles.labelText}>{ label }</Text>
      )}
      <TextInput
        ref={(ref) => {
          textInputRef.current = ref;
          if (onRef) {
            onRef(ref);
          }
        }}
        style={styles.textInput}
        onFocus={focus}
        {...textInputProps}
      />
      { error && (
        <Text style={styles.errorText}>{ error }</Text>
      )}
    </TouchableOpacity>
  );
}

TextField.propTypes = {
  scrollViewRef: PropTypes.any,
  label: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  onRef: PropTypes.func,
  onOffset: PropTypes.func,
  error: PropTypes.string,
  autofocus: PropTypes.bool,
  textInputProps: PropTypes.shape({
    ...TextInput.propTypes
  })
};

TextField.defaultProps = {
  scrollViewRef: null,
  label: null,
  containerStyle: {},
  autofocus: false,
  textInputProps: {},
  onRef: null,
  onOffset: null,
  error: null
};

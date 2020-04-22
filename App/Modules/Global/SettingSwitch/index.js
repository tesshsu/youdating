import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Switch } from 'react-native-gesture-handler';

import styles from './styles';
import useCurrentMood from '../../../Hooks/useCurrentMood';

export default function SettingSwitch(props) {
  const {
    label,
    value,
    disabled,
    onChange
  } = props;

  const { moodInfos } = useCurrentMood();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.label,
          { color: moodInfos.color }
        ]}
      >
        { label }
      </Text>
      <Switch
        disabled={disabled}
        value={value}
        trackColor={{
          true: moodInfos.color,
          false: '#D3D4D9'
        }}
        onValueChange={onChange}
      />
    </View>
  );
}

SettingSwitch.defaultProps = {
  disabled: false
};

SettingSwitch.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

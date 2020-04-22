import React from 'react';
import {
  View,
  Text,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default function SettingsCard(props) {
  const {
    title,
    rightLabel,
    containerStyle,
    children
  } = props;

  return (
    <View
      style={[
        styles.container,
        containerStyle
      ]}
    >
      <Text style={styles.title}>{ title }</Text>
      <View style={styles.card}>
        { rightLabel && (
          <Text style={styles.rightLabel}>
            { rightLabel }
          </Text>
        )}
        { React.Children.map(children, (c, index) => (
          <View
            style={[
              styles.settingItem,
              index === children.length - 1 && { borderBottomWidth: 0 }
            ]}
          >
            { c }
          </View>
        ))}
      </View>
    </View>
  );
}

SettingsCard.propTypes = {
  title: PropTypes.string.isRequired,
  rightLabel: PropTypes.string,
  containerStyle: ViewPropTypes.style
};

SettingsCard.defaultProps = {
  rightLabel: null,
  containerStyle: {}
};

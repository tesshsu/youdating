import React from 'react';
import {
  View,
  Text,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default function SectionTitle(props) {
  const {
    title,
    containerStyle
  } = props;

  return (
    <View
      style={[
        styles.container,
        containerStyle
      ]}
    >
      <View style={styles.bar} />
      <Text style={styles.text}>{ title }</Text>
      <View style={styles.bar} />
    </View>
  );
}

SectionTitle.defaultProps = {
  containerStyle: {}
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  containerStyle: ViewPropTypes.style
};

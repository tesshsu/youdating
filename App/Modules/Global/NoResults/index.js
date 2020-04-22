import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import { moderateScale } from '../../../Helpers/ScaleHelper';

export default function NoResults() {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>
        { /* eslint-disable-next-line jsx-a11y/accessible-emoji */ }
        <Text style={{ fontSize: moderateScale(30) }}>😢</Text>
        {'\n\nAucun résultat\nne correspond à votre recherche'}
      </Text>
    </View>
  );
}

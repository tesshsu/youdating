import React from 'react';
import { ScrollView } from 'react-native';

import styles from './styles';

export default function Scene({ children }) {
  return (
    <ScrollView style={styles.scrollViewContent}>
      { children }
    </ScrollView>
  );
}

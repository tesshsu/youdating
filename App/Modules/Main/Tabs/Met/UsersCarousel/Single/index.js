import React, { useState } from 'react';
import {
  View,
  ScrollView
} from 'react-native';

import UserCard from './UserCard';
import styles from './styles';
import { verticalScale } from '../../../../../../Helpers/ScaleHelper';

export default function Single({ users, onConsultProfil }) {
  const [maxHeight, setMaxHeight] = useState(null);

  function onLayout(ev) {
    const { height } = ev.nativeEvent.layout;

    if (maxHeight === null && height > 0) {
      setMaxHeight(height - verticalScale(5));
    }
  }

  return (
    <View
      style={styles.container}
      onLayout={onLayout}
    >
      <ScrollView
        style={styles.scrolView}
        contentContainerStyle={styles.scrollViewContent}
      >
        { maxHeight !== null && users.map(u => (
          <UserCard
            maxHeight={maxHeight}
            key={u.id}
            {...u}
            onConsultProfil={() => onConsultProfil(u)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

import React, { useMemo, useState } from 'react';
import {
  View,
  ScrollView
} from 'react-native';

import styles from './styles';
import UserCard from './UserCard';

import SectionTitle from '../../../../../Global/SectionTitle';
import { verticalScale } from '../../../../../../Helpers/ScaleHelper';

export default function Grid({ users, onConsultProfil }) {
  const [gridItemHeight, setGridItemHeight] = useState(null);

  const grid = useMemo(() => {
    const toReturn = [];
    const remainingUsers = [...users];

    while (remainingUsers.length) {
      toReturn.push(remainingUsers.splice(0, 4));
    }

    return toReturn;
  }, [users]);

  function onLayout(ev) {
    const { height } = ev.nativeEvent.layout;

    if (gridItemHeight === null) {
      setGridItemHeight(height - verticalScale(60));
    }
  }

  return (
    <>
      {/* <SectionTitle
        title="moins de 500 M"
        containerStyle={styles.sectionTitleContainer}
      /> */}
      <View style={styles.fill} onLayout={onLayout}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          { gridItemHeight !== null && grid.map((items, index) => (
            <View key={index.toString()} style={[styles.container, { height: gridItemHeight }]}>
              <View style={styles.row}>
                <View style={styles.card}>
                  { items[0] ? <UserCard {...items[0]} onConsultProfil={() => onConsultProfil(items[0])} /> : (null) }
                </View>
                <View style={styles.card}>
                  { items[1] ? <UserCard {...items[1]} onConsultProfil={() => onConsultProfil(items[1])} /> : (null) }
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.card}>
                  { items[2] ? <UserCard {...items[2]} onConsultProfil={() => onConsultProfil(items[2])} /> : (null) }
                </View>
                <View style={styles.card}>
                  { items[3] ? <UserCard {...items[3]} onConsultProfil={() => onConsultProfil(items[3])} /> : (null) }
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

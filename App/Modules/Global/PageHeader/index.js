import React from 'react';
import {
  View,
  Text,
  SafeAreaView
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import useCurrentMood from '../../../Hooks/useCurrentMood';
import NavigationHelper from '../../../Helpers/NavigationHelper';

export default function PageHeader(props) {
  const {
    title,
    leftComponent,
    rightComponent,
    backButton,
    inverted
  } = props;
  const { moodInfos } = useCurrentMood();

  return (
    <View style={{ backgroundColor: inverted ? 'white' : moodInfos.color }}>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.fill}>
            { leftComponent != null ? leftComponent() : null }
            { backButton && (
              <Feather
                name="chevron-left"
                color={inverted ? moodInfos.color : 'white'}
                size={21}
                onPress={() => NavigationHelper.back()}
              />
            )}
          </View>
          <Text
            style={[
              styles.text,
              { color: inverted ? moodInfos.color : 'white' }
            ]}
          >
            { title }
          </Text>
          <View style={styles.right}>
            { rightComponent != null ? rightComponent() : (null)}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

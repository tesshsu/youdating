import React, { useState } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import { scale } from '../../../../Helpers/ScaleHelper';
import PageHeader from '../../../Global/PageHeader';
import MoodSelectorHeaderButton from '../../../Global/MoodSelectorHeaderButton';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import CompatibilitiesList from './CompatibilitiesList';
import CompatibilityResult from './CompatibilityResult';

export default function MainCompatibility() {
  const { moodInfos } = useCurrentMood();
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <PageHeader
        title="Compatibilité"
        leftComponent={() => (
          <MoodSelectorHeaderButton />
        )}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{`Mes contacts ${moodInfos.title}`}</Text>
        <CompatibilitiesList
          selectedUser={selectedUser}
          onSelected={setSelectedUser}
        />
        <CompatibilityResult
          user={selectedUser}
        />
      </View>
    </>
  );
}

MainCompatibility.navigationOptions = {
  tabBarLabel: 'Compatibilité',
  tabBarIcon: ({ tintColor }) => (
    <Feather name="refresh-cw" color={tintColor} size={scale(20)} />
  )
};

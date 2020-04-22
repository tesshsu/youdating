import React, { useMemo } from 'react';
import { View } from 'react-native';

import styles from './styles';
import PageHeader from '../../../../Global/PageHeader';
import MoodSelector from '../../../../Global/MoodSelector';
import TabView from '../../../../Global/TabView';
import Received from './Received';
import Sent from './Sent';
import { useViews } from '../../../../../Hooks/useViews';

export default function Views() {
  const { received, sent } = useViews();

  const Tabs = useMemo(() => () => (
    <TabView
      labelStyle={styles.tabBarLabelStyle}
      scenes={[
        {
          title: received.length ? `${received.length}\nvues reçus` : 'Aucune vue reçu',
          key: 'received',
          View: Received
        },
        {
          title: sent.length ? `${sent.length}\nvues envoyés` : 'Aucune vue envoyé',
          key: 'sent',
          View: Sent
        },
      ]}
    />
  ), [received, sent]);

  return (
    <View style={styles.container}>
      <PageHeader
        title="Vues"
        backButton
      />
      <MoodSelector />
      <Tabs />
    </View>
  );
}

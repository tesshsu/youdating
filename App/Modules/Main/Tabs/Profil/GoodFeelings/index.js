import React, { useMemo } from 'react';
import { View } from 'react-native';

import styles from './styles';
import PageHeader from '../../../../Global/PageHeader';
import MoodSelector from '../../../../Global/MoodSelector';
import TabView from '../../../../Global/TabView';
import Received from './Received';
import Sent from './Sent';
import useGoodFeelings from '../../../../../Hooks/useGoodFeelings';


export default function GoodFeelings() {
  const { sent, received } = useGoodFeelings();

  const Tabs = useMemo(() => () => (
    <TabView
      labelStyle={styles.tabBarLabelStyle}
      scenes={[
        {
          title: received.length ? `${received.length}\nGood feelings reçus` : 'Aucun good feeling reçu',
          key: 'received',
          View: Received
        },
        {
          title: sent.length ? `${sent.length}\nGood feelings envoyés` : 'Aucun good feeling envoyé',
          key: 'sent',
          View: Sent
        },
      ]}
    />
  ), [received, sent]);


  return (
    <View style={styles.container}>
      <PageHeader
        title="Good Feelings"
        backButton
      />
      <MoodSelector />
      <Tabs />
    </View>
  );
}

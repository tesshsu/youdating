import React from 'react';

import styles from './styles';
import PageHeader from '../../../../Global/PageHeader';
import MoodSelector from '../../../../Global/MoodSelector';
import TabView from '../../../../Global/TabView';
import Received from './Received';
import Sent from './Sent';


export default function Views() {
  return (
    <>
      <PageHeader
        title="Attractions"
        backButton
      />
      <MoodSelector />
      <TabView
        labelStyle={styles.tabBarLabelStyle}
        scenes={[
          {
            title: '25\nattractions reçues',
            key: 'received',
            View: Received
          },
          {
            title: '12\nattractions envoyées',
            key: 'sent',
            View: Sent
          },
        ]}
      />
    </>
  );
}

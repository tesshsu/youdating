import React, { useCallback } from 'react';
import {
  FlatList, Text, RefreshControl, Alert
} from 'react-native';
import moment from 'moment';

import UserListItem from '../../../../../Global/UserListItem';
import YousOn from '../../../../../Global/YousOn';
import styles from './styles';
import ListItemSeparator from '../../../../../Global/ListItemSeparator';
import { useViews } from '../../../../../../Hooks/useViews';
import useCurrentMood from '../../../../../../Hooks/useCurrentMood';
import useVisitedProfil from '../../../../../../Hooks/useVisitedProfil';
import useSearch from '../../../../../../Hooks/useSearch';

export default function Sent() {
  const { isFetching, fetchAll, sent } = useViews();
  const { visitProfil } = useVisitedProfil();
  const { currentMood } = useCurrentMood();
  const { addRecent } = useSearch();

  async function fetchViews() {
    try {
      await fetchAll();
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de récupérér les vues');
    }
  }

  const consultProfil = useCallback(async (user) => {
    try {
      await visitProfil(user.id);
      addRecent(user);
    } catch (err) {
      Alert.alert('Erreur', err.message);
    }
  }, [addRecent, visitProfil]);

  return (
    <FlatList
      data={sent}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={ListItemSeparator}
      keyExtractor={item => item.id}
      refreshing={isFetching}
      refreshControl={(
        <RefreshControl
          refreshing={isFetching}
          onRefresh={fetchViews}
        />
      )}
      renderItem={({ item }) => (
        <UserListItem
          onConsultProfil={() => consultProfil(item.target)}
          image={item.target.moods[currentMood].avatar}
          title={item.target.firstName}
          subTitle={subTitleProps => (
            <YousOn online>
              <Text {...subTitleProps}>{`${moment().diff(moment.unix(item.target.birthday), 'years')}-PARIS`}</Text>
            </YousOn>
          )}
          subSubTitle="Vous avez visité son profil"
          rightText={moment(item.createdAt).fromNow()}
        />
      )}
    />
  );
}

import React, { useCallback } from 'react';
import {
  FlatList, Text, Alert, RefreshControl
} from 'react-native';

import moment from 'moment';
import styles from './styles';
import ListItemSeparator from '../../../../../Global/ListItemSeparator';
import UserListItem from '../../../../../Global/UserListItem';
import YousOn from '../../../../../Global/YousOn';
import { useViews } from '../../../../../../Hooks/useViews';
import useVisitedProfil from '../../../../../../Hooks/useVisitedProfil';
import useCurrentMood from '../../../../../../Hooks/useCurrentMood';
import useSearch from '../../../../../../Hooks/useSearch';

export default function Received() {
  const { isFetching, fetchAll, received } = useViews();
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
      data={received}
      contentContainerStyle={styles.content}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={ListItemSeparator}
      refreshing={isFetching}
      refreshControl={(
        <RefreshControl
          refreshing={isFetching}
          onRefresh={fetchViews}
        />
      )}
      renderItem={({ item }) => (
        <UserListItem
          onConsultProfil={() => consultProfil(item?.author)}
          image={item?.author?.moods[currentMood]?.avatar}
          title={item?.author?.firstName}
          subTitle={subTitleProps => (
            <YousOn online>
              <Text {...subTitleProps}>{`${moment().diff(moment(item?.author?.birthday), 'years')}-PARIS`}</Text>
            </YousOn>
          )}
          subSubTitle="A visité votre profil"
          rightText={moment(item.createdAt).fromNow()}
        />
      )}
    />
  );
}

import React, { useCallback } from 'react';
import {
  FlatList, Text, Alert, RefreshControl
} from 'react-native';
import moment from 'moment';

import styles from './styles';
import ListItemSeparator from '../../../../../Global/ListItemSeparator';
import UserListItem from '../../../../../Global/UserListItem';
import YousOn from '../../../../../Global/YousOn';
import useGoodFeelings from '../../../../../../Hooks/useGoodFeelings';
import useCurrentMood from '../../../../../../Hooks/useCurrentMood';
import useVisitedProfil from '../../../../../../Hooks/useVisitedProfil';
import useSearch from '../../../../../../Hooks/useSearch';

export default function Received() {
  const { currentMood } = useCurrentMood();
  const { visitProfil } = useVisitedProfil();
  const { received, isFetching, fetchAll } = useGoodFeelings();
  const { addRecent } = useSearch();

  const refresh = useCallback(async () => {
    try {
      await fetchAll();
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de récupérer les good feelings');
    }
  }, [fetchAll]);

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
      keyExtractor={item => item.username}
      ItemSeparatorComponent={ListItemSeparator}
      refreshing={isFetching}
      refreshControl={(
        <RefreshControl
          refreshing={isFetching}
          onRefresh={refresh}
        />
      )}
      renderItem={({ item }) => (
        <UserListItem
          onConsultProfil={() => consultProfil(item?.author)}
          image={item?.author?.moods[currentMood]?.avatar}
          title={item?.author?.firstName}
          subTitle={subTitleProps => (
            <YousOn online>
              <Text {...subTitleProps}>{`${moment().diff(moment(item?.author?.birthday), 'years')}ANS-PARIS`}</Text>
            </YousOn>
          )}
          subSubTitle="Vous a envoyé un good feeling"
          rightText={moment(item.createdAt).fromNow()}
        />
      )}
    />
  );
}

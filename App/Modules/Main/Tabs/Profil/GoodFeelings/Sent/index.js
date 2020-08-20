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

export default function Sent() {
  const { currentMood } = useCurrentMood();
  const { visitProfil } = useVisitedProfil();
  const { sent, isFetching, fetchAll } = useGoodFeelings();
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
      data={sent}
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
          onConsultProfil={() => consultProfil(item?.target)}
          image={item?.target?.moods[currentMood]?.avatar}
          title={item?.target?.firstName}
          subTitle={subTitleProps => (
            <YousOn online>
              <Text {...subTitleProps}>{`${moment().diff(moment(item?.target?.birthday), 'years')}ANS-PARIS`}</Text>
            </YousOn>
          )}
          subSubTitle="Vous avez envoyé un good feeling"
          rightText={moment(item.createdAt).fromNow()}
        />
      )}
    />
  );
}

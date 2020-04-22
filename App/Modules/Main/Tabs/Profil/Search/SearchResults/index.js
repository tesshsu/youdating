import React, { useMemo, useCallback } from 'react';
import {
  Text,
  RefreshControl,
  Alert,
  SectionList,
} from 'react-native';

import moment from 'moment';
import styles from './styles';
import useCurrentMood from '../../../../../../Hooks/useCurrentMood';
import YousOn from '../../../../../Global/YousOn';
import UserListItem from '../../../../../Global/UserListItem';
import useSearch from '../../../../../../Hooks/useSearch';
import ListItemSeparator from '../../../../../Global/ListItemSeparator';
import useVisitedProfil from '../../../../../../Hooks/useVisitedProfil';
import NoResults from '../../../../../Global/NoResults';

export default function SearchResults() {
  const { moodInfos, currentMood } = useCurrentMood();
  const {
    searchTerm,
    category,
    results,
    recents,
    isFetching,
    addRecent
  } = useSearch();
  const { visitProfil } = useVisitedProfil();

  const sections = useMemo(() => {
    if (searchTerm === '' && !results.length && !isFetching) {
      return [
        {
          title: 'Récents',
          data: recents.map(r => ({
            ...r,
            avatar: r.moods[currentMood].avatar
          }))
        }
      ];
    }

    return [
      {
        title: 'Résultats de recherche',
        data: results.map(r => ({
          ...r,
          avatar: r.moods[currentMood].avatar
        }))
      }
    ];
  }, [currentMood, isFetching, recents, results, searchTerm]);

  const consultProfil = useCallback(async (user) => {
    try {
      await visitProfil(user.id);
      addRecent(user);
    } catch (err) {
      Alert.alert('Erreur', err.message);
    }
  }, [addRecent, visitProfil]);

  return (
    <SectionList
      style={{ flex: 1 }}
      contentContainerStyle={styles.content}
      sections={sections}
      keyExtractor={(_, idx) => idx.toString()}
      refreshing={isFetching}
      refreshControl={(
        <RefreshControl
          refreshing={isFetching}
          onRefresh={() => {}}
        />
      )}
      ItemSeparatorComponent={ListItemSeparator}
      ListEmptyComponent={NoResults}
      renderSectionHeader={({ section: { title } }) => (
        <Text
          style={[
            styles.sectionHeader,
            { color: moodInfos.color }
          ]}
        >
          {title}
        </Text>
      )}
      renderItem={({ item }) => (
        <UserListItem
          onConsultProfil={() => consultProfil(item)}
          image={item.avatar}
          title={item.firstName}
          subTitle={({ style }) => (
            <YousOn online>
              <Text style={style}>{category !== 'HASH' ? `${moment().diff(moment.unix(item.birthday), 'years')}ANS-${item.city.toUpperCase()}` : `#${item.moods[currentMood].tag}`}</Text>
            </YousOn>
          )}
        />
      )}
    />
  );
}

import React, { useCallback, useMemo } from 'react';

import { ActivityIndicator, Alert } from 'react-native';
import useProfilesMod from '../../../../../Hooks/useProfilesMod';
import Single from './Single';
import Grid from './Grid';
import useMet from '../../../../../Hooks/useMet';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import NoResults from '../../../../Global/NoResults';
import useVisitedProfil from '../../../../../Hooks/useVisitedProfil';
import useSearch from '../../../../../Hooks/useSearch';

export default function UsersCarousel() {
  const { profilesMod } = useProfilesMod();
  const { isFetching, results } = useMet();
  const { addRecent } = useSearch();
  const { visitProfil } = useVisitedProfil();
  const { moodInfos } = useCurrentMood();

  const consultProfil = useCallback(async (user) => {
    try {
      await visitProfil(user.id);
      addRecent(user);
    } catch (err) {
      Alert.alert('Erreur', err.message);
    }
  }, [addRecent, visitProfil]);

  const users = useMemo(() => results.map((r) => {
    const mood = Object.keys(r.moods)[0];
    return { ...r, avatar: r.moods[mood].avatar, description: r.moods[mood].description };
  }), [results]);

  if (isFetching) {
    return (
      <ActivityIndicator
        size="large"
        color={moodInfos.color}
      />
    );
  }

  if (!isFetching && !results.length) {
    return (<NoResults />);
  }
  return profilesMod === 'SINGLE'
    ? (<Single users={users} onConsultProfil={consultProfil} />)
    : (<Grid users={users} onConsultProfil={consultProfil} />);
}

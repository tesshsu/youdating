import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { Alert } from 'react-native';

import * as MET_ACTIONS from '../Redux/actions/met';
import useCurrentMood from './useCurrentMood';
import useLogguedUser from './useLogguedUser';

export default function useMet() {
  const {
    isFetching,
    results
  } = useSelector(state => state.met);
  const dispatch = useDispatch();
  const { currentMood } = useCurrentMood();
  const { logguedUser } = useLogguedUser();
  const moodSettings = useMemo(() => ({ ...logguedUser.moods[currentMood] }), [currentMood, logguedUser]);

  const searchNear = useCallback(async () => {
    try {
      await dispatch(MET_ACTIONS.searchNear(currentMood));
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de récupérer les résultats');
    }
  }, [currentMood, dispatch]);

  useEffect(() => {
    searchNear();
  }, [currentMood, searchNear, logguedUser.location.coordinates, moodSettings]);

  return {
    isFetching,
    results,
  };
}

import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useCallback } from 'react';
import { Alert } from 'react-native';

import useCurrentMood from './useCurrentMood';
import * as COMPATIBILITY_REQUESTS_ACTIONS from '../Redux/actions/compatibilityRequests';

export default function useCompatibilityRequests() {
  const dispatch = useDispatch();
  const { currentMood } = useCurrentMood();
  const { isFetching, ...allCrs } = useSelector(state => state.compatibilityRequests);

  const compatibilityRequests = useMemo(() => allCrs[currentMood], [allCrs, currentMood]);

  const fetchAll = useCallback(async () => {
    try {
      await dispatch(COMPATIBILITY_REQUESTS_ACTIONS.fetchAll());
    } catch (err) {
      console.log('error compatibility requests', err);
    }
  }, [dispatch]);

  const fetch = useCallback(async (id) => {
    try {
      await dispatch(COMPATIBILITY_REQUESTS_ACTIONS.fetchById(id));
    } catch (err) {
      Alert.alert('useCompatibilityRequests', err);
    }
  }, [dispatch]);

  const accept = useCallback(async (id) => {
    try {
      await dispatch(COMPATIBILITY_REQUESTS_ACTIONS.accept(id, currentMood));
    } catch (err) {
      Alert.alert('useCompatibilityRequests currentMood', err);
    }
  }, [currentMood, dispatch]);

  const create = useCallback(async (target) => {
    try {
      await dispatch(COMPATIBILITY_REQUESTS_ACTIONS.create(target, currentMood));
    } catch (err) {
      Alert.alert('useCompatibilityRequests target', err);
    }
  }, [currentMood, dispatch]);

  return {
    isFetching,
    fetchAll,
    fetch,
    create,
    accept,
    compatibilityRequests
  };
}

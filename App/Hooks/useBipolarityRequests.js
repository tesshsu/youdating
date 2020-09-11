import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useCallback } from 'react';
import { Alert } from 'react-native';

import useCurrentMood from './useCurrentMood';
import * as BIPOLARITY_REQUESTS_ACTIONS from '../Redux/actions/bipolarityRequests';
import NavigationHelper from '../Helpers/NavigationHelper';

export default function useBipolarityRequests() {
  const dispatch = useDispatch();
  const { currentMood } = useCurrentMood();
  const { isFetching, ...allCrs } = useSelector(state => state.bipolarityRequests);

  const bipolarityRequests = useMemo(() => allCrs[currentMood], [allCrs, currentMood]);

  const fetchAll = useCallback(async () => {
    try {
      await dispatch(BIPOLARITY_REQUESTS_ACTIONS.fetchAll());
    } catch (err) {
      console.log('error bipolarity requests', err);
    }
  }, [dispatch]);

  const fetch = useCallback(async (id) => {
    try {
      await dispatch(BIPOLARITY_REQUESTS_ACTIONS.fetchById(id));
    } catch (err) {
      Alert.alert('useBipolarityRequests', err);
    }
  }, [dispatch]);

  const accept = useCallback(async (id) => {
    try {
      await dispatch(BIPOLARITY_REQUESTS_ACTIONS.accept(id, currentMood));
    } catch (err) {
      Alert.alert('useBipolarityRequests currentMood', err);
    }
  }, [currentMood, dispatch]);

  const create = useCallback(async (target) => {
    try {
      await dispatch(BIPOLARITY_REQUESTS_ACTIONS.create(target.id, currentMood));
    } catch (err) {
      Alert.alert('useBipolarityRequests target', err);
    }
  }, [currentMood, dispatch]);

  return {
    isFetching,
    fetchAll,
    fetch,
    create,
    accept,
    bipolarityRequests
  };
}

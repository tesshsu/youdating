import { useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';

import * as SEARCH_ACTIONS from '../Redux/actions/search';
import useCurrentMood from './useCurrentMood';

export default function useSearch() {
  const { currentMood } = useCurrentMood();
  const search = useSelector(state => state.search);
  const dispatch = useDispatch();
  const moodSearch = useMemo(() => search[currentMood], [currentMood, search]);
  const [debouncedSearch] = useDebouncedCallback(() => {
    const { searchTerm } = moodSearch;
    const { searchCategory } = search;

    if (searchTerm === '') {
      return;
    }

    const payload = {};

    if (searchCategory === 'USERS') {
      payload.name = searchTerm;
    } else if (searchCategory === 'HASH') {
      payload.tag = searchTerm;
    } else {
      payload.city = searchTerm;
    }

    dispatch(SEARCH_ACTIONS.search(payload, currentMood));
  }, 600);

  const setSearchCategory = useCallback((category) => {
    dispatch(
      SEARCH_ACTIONS.setCategory(category)
    );
  }, [dispatch]);

  const setSearchTerm = useCallback((searchTerm) => {
    dispatch(SEARCH_ACTIONS.setSearchTerm(searchTerm, currentMood));

    if (searchTerm === '') {
      dispatch(SEARCH_ACTIONS.setResults([], currentMood));
    } else {
      debouncedSearch();
    }
  }, [currentMood, debouncedSearch, dispatch]);

  const addRecent = useCallback((user) => {
    dispatch(SEARCH_ACTIONS.addRecent(user, currentMood));
  }, [currentMood, dispatch]);

  useEffect(() => {
    dispatch(SEARCH_ACTIONS.setResults([], currentMood));
    debouncedSearch();
  }, [currentMood, debouncedSearch, dispatch, search.searchCategory]);


  return {
    category: search.searchCategory,
    ...moodSearch,
    setSearchCategory,
    setSearchTerm,
    addRecent
  };
}

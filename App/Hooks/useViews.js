import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useCallback } from 'react';
import useLogguedUser from './useLogguedUser';
import * as VIEWS_ACTIONS from '../Redux/actions/views';
import useCurrentMood from './useCurrentMood';

export function useViews() {
  const { currentMood } = useCurrentMood();
  const { isFetching, ...moodViews } = useSelector(state => state.views);
  const { logguedUser } = useLogguedUser();
  const dispatch = useDispatch();

  const { received, sent } = useMemo(() => ({
    received: logguedUser === null ? [] : moodViews[currentMood].filter(v => v.target.id === logguedUser.id),
    sent: logguedUser === null ? [] : moodViews[currentMood].filter(v => v.author.id === logguedUser.id)
  }), [moodViews, logguedUser, currentMood]);

  const fetchAll = useCallback(() => dispatch(VIEWS_ACTIONS.fetchAll()), [dispatch]);
  const createView = useCallback((targetId, mood) => dispatch(VIEWS_ACTIONS.createView(targetId, mood)), [dispatch]);

  return {
    isFetching,
    received,
    sent,
    fetchAll,
    createView
  };
}

import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MOODS } from '../GlobalConfig';

import { setMood } from '../Redux/actions/currentMood';

export default function useCurrentMood() {
  const currentMood = useSelector(state => state.currentMood);
  const dispatch = useDispatch();

  const setCurrentMood = useCallback(mood => dispatch(setMood(mood)), [dispatch]);

  const moodInfos = currentMood ? MOODS[currentMood] : null;

  return {
    currentMood,
    moodInfos,
    setCurrentMood
  };
}

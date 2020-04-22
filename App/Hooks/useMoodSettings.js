import { useSelector, useDispatch } from 'react-redux';

import * as MOOD_SETTINGS_ACTIONS from '../Redux/actions/moodSettings';

function selector(state) {
  const {
    currentMood,
    moodSettings
  } = state;

  return {
    currentMood,
    settings: moodSettings[currentMood]
  };
}

export default function useMoodSettings() {
  const { currentMood, settings } = useSelector(selector);
  const dispatch = useDispatch();

  function setMoodSettings(newSettings) {
    dispatch(
      MOOD_SETTINGS_ACTIONS.setSettings(currentMood, newSettings)
    );
  }

  return {
    moodSettings: settings,
    setMoodSettings
  };
}

import { combineReducers } from 'redux';

import { MOODS } from '../../GlobalConfig';
import * as MOOD_SETTINGS_ACTIONS from '../actions/moodSettings';

const initialState = {
  lookingFor: 'MAN',
  maxDistance: 10
};

function createMoodReducer(mood) {
  return function reducer(state = initialState, action) {
    if (!action || !action.payload || action.payload.mood !== mood) {
      return state;
    }

    switch (action.type) {
      case MOOD_SETTINGS_ACTIONS.SET_SETTINGS:
        return { ...state, ...action.payload.settings };
      default:
        return state;
    }
  };
}

const reducers = Object
  .keys(MOODS)
  .reduce((prev, curr) => {
    // eslint-disable-next-line no-param-reassign
    prev[curr] = createMoodReducer(curr);

    return prev;
  }, {});

export default combineReducers({
  ...reducers
});

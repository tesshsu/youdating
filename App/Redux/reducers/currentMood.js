import * as ACTIONS from '../actions/currentMood';

const initialState = 'PRO';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_MOOD:
      return action.payload.mood;
    default:
      return state;
  }
}

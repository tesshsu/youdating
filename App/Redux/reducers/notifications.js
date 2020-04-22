import * as NOTIFICATIONS_ACTIONS from '../actions/notifications';

export default function reducer(state = [], action) {
  switch (action.type) {
    case NOTIFICATIONS_ACTIONS.SHOW_NOTIFICATION:
      return [...state, action.payload];
    case NOTIFICATIONS_ACTIONS.HIDE_NOTIFICATION:
      return state.filter(s => s.uid !== action.payload.uid);
    default:
      return state;
  }
}

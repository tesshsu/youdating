import { combineReducers } from 'redux';

import createMoodsReducer from '../createMoodsReducer';
import * as VIEWS_ACTIONS from '../actions/views';

function isFetchingReducer(state = false, action) {
  switch (action.type) {
    case VIEWS_ACTIONS.SET_FETCHING:
      return action.payload.isFetching;
    default:
      return state;
  }
}

const moodsReducer = createMoodsReducer((state, action) => {
  switch (action.type) {
    case VIEWS_ACTIONS.SET_VIEWS:
      return [...action.payload.views];
    case VIEWS_ACTIONS.ADD_VIEW:
      return [...state, action.payload.view];
    default:
      return state;
  }
}, []);

export default combineReducers({
  isFetching: isFetchingReducer,
  ...moodsReducer
});

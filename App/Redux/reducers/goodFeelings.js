import { combineReducers } from 'redux';
import createMoodsReducer from '../createMoodsReducer';
import * as GOOD_FEELINGS_ACTIONS from '../actions/goodFeelings';

function isFetchingReducer(state = false, action) {
  switch (action.type) {
    case GOOD_FEELINGS_ACTIONS.SET_FETCHING:
      return action.payload.isFetching;
    default:
      return state;
  }
}

const moodsReducer = createMoodsReducer((state, action) => {
  switch (action.type) {
    case GOOD_FEELINGS_ACTIONS.SET_GOOD_FEELINGS:
      return [...action.payload.goodFeelings];
    case GOOD_FEELINGS_ACTIONS.ADD_GOOD_FEELING:
      return [...state, action.payload.goodFeeling];
    default:
      return state;
  }
}, []);

export default combineReducers({
  isFetching: isFetchingReducer,
  ...moodsReducer
});

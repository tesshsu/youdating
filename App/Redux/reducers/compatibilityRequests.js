import { combineReducers } from 'redux';
import createMoodsReducer from '../createMoodsReducer';
import * as COMPATIBILITY_REQUESTS_ACTIONS from '../actions/compatibilityRequests';

function isFetchingReducer(state = false, action) {
  switch (action.type) {
    case COMPATIBILITY_REQUESTS_ACTIONS.SET_FETCHING:
      return action.payload.isFetching;
    default:
      return state;
  }
}

const addOrUpdateState = (state, { compatibilityRequest }) => {
  const compatibilityRequests = state.map((cr) => {
    if (cr.id === compatibilityRequest.id) {
      return { ...cr, ...compatibilityRequest };
    }

    return cr;
  });

  if (!compatibilityRequests.some(cr => cr.id === compatibilityRequests.id)) {
    compatibilityRequests.push(compatibilityRequest);
  }

  return compatibilityRequests;
};

const moodsReducer = createMoodsReducer((state, action) => {
  switch (action.type) {
    case COMPATIBILITY_REQUESTS_ACTIONS.SET_COMPATIBILITY_REQUESTS:
      return [...action.payload.compatibilityRequest];
    case COMPATIBILITY_REQUESTS_ACTIONS.ADD_OR_UPDATE_COMPATIBILITY_REQUEST:
      return addOrUpdateState(state, action.payload);
    default:
      return state;
  }
}, []);

export default combineReducers({
  isFetching: isFetchingReducer,
  ...moodsReducer
});

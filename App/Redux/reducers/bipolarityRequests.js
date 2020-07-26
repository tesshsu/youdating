import { combineReducers } from 'redux';
import createMoodsReducer from '../createMoodsReducer';
import * as BIPOLARITY_REQUESTS_ACTIONS from '../actions/bipolarityRequests';

function isFetchingReducer(state = false, action) {
  switch (action.type) {
    case BIPOLARITY_REQUESTS_ACTIONS.SET_FETCHING:
      return action.payload.isFetching;
    default:
      return state;
  }
}

const addOrUpdateState = (state, { compatibilityRequest }) => {
  const bipolarityRequests = state.map((cr) => {
    if (cr.id === bipolarityRequest.id) {
      return { ...cr, ...bipolarityRequest };
    }

    return cr;
  });

  if (!bipolarityRequests.some(cr => cr.id === bipolarityRequests.id)) {
    bipolarityRequests.push(bipolarityRequest);
  }

  return bipolarityRequests;
};

const moodsReducer = createMoodsReducer((state, action) => {
  switch (action.type) {
    case BIPOLARITY_REQUESTS_ACTIONS.SET_BIPOLARITY_REQUESTS:
      return [...action.payload.bipolarityRequest];
    case BIPOLARITY_REQUESTS_ACTIONS.ADD_OR_UPDATE_BIPOLARITY_REQUEST:
      return addOrUpdateState(state, action.payload);
    default:
      return state;
  }
}, []);

export default combineReducers({
  isFetching: isFetchingReducer,
  ...moodsReducer
});

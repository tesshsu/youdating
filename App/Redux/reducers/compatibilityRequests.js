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
  const compatibilityRequests = state?.compatibilityRequests.map((cr) => {
    if (cr.id === compatibilityRequest.id) {
      return { ...cr, ...compatibilityRequest };
    }

    return cr;
  });

  if (!compatibilityRequests.some(cr => cr.id === compatibilityRequest.id)) {
    compatibilityRequests.push(compatibilityRequest);
  }

 return {
    ...state,
    compatibilityRequests
  };
};

const moodsReducer = createMoodsReducer((state, action) => {
  switch (action.type) {
    case COMPATIBILITY_REQUESTS_ACTIONS.SET_FETCHING:
        return { ...state, isFetching: action.payload.isFetching };
    case COMPATIBILITY_REQUESTS_ACTIONS.SET_COMPATIBILITY_REQUESTS:
      return {...state, compatibilityRequests: action.payload.compatibilityRequests };
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
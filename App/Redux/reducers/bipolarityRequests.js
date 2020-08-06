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

const addOrUpdateState = (state, { bipolarityRequest }) => {
  if(state.bipolarityRequests === undefined){
    state.bipolarityRequests = [];
  }

  const bipolarityRequests = state?.bipolarityRequests?.map((bp) => {
    if (bp.id === bipolarityRequest.id) {
      return { ...bp, ...bipolarityRequest };
    }

    return bp;
  });

  if (!bipolarityRequests?.some(bp => bp.id === bipolarityRequest.id)) {
    bipolarityRequests?.push(bipolarityRequest);
  }

  return {
    ...state,
    bipolarityRequests
  };
};

const moodsReducer = createMoodsReducer((state, action) => {
  switch (action.type) {
    case BIPOLARITY_REQUESTS_ACTIONS.SET_BIPOLARITY_REQUESTS:
      return [...action.payload.bipolarityRequest];
    case BIPOLARITY_REQUESTS_ACTIONS.SET_BIPOLARITIES:
      return {...state, bipolarityRequests: action.payload.bipolarityRequests };
    case BIPOLARITY_REQUESTS_ACTIONS.ADD_OR_UPDATE_BIPOLARITY:
      return addOrUpdateState(state, action.payload);
    default:
      return state;
  }
}, []);

export default combineReducers({
  isFetching: isFetchingReducer,
  ...moodsReducer
});

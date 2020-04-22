import * as MET_ACTIONS from '../actions/met';

const initialState = {
  isFetching: false,
  results: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MET_ACTIONS.SET_FETCHING:
      return { ...state, isFetching: action.payload.isFetching };
    case MET_ACTIONS.SET_RESULTS:
      return { ...state, results: action.payload.results };
    default:
      return state;
  }
}

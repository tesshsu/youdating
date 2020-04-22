import { combineReducers } from 'redux';
import createMoodsReducer from '../createMoodsReducer';

import * as SEARCH_ACTIONS from '../actions/search';

function searchCategoryReducer(state = 'USERS', action) {
  switch (action.type) {
    case SEARCH_ACTIONS.SET_CATEGORY:
      return action.payload.category;
    default:
      return state;
  }
}

const moodsReducerInitialState = {
  isFetching: false,
  searchTerm: '',
  results: [],
  recents: []
};

const addRecentToState = (state, { user }) => {
  const recents = state.recents.filter(r => r.id !== user.id);

  recents.unshift(user);
  return {
    ...state,
    recents: recents.slice(0, 4)
  };
};

const moodsReducers = createMoodsReducer((state, action) => {
  switch (action.type) {
    case SEARCH_ACTIONS.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload.searchTerm, isFetching: true };
    case SEARCH_ACTIONS.SET_RESULTS:
      return { ...state, results: [...action.payload.results], isFetching: false };
    case SEARCH_ACTIONS.ADD_RECENT:
      return addRecentToState(state, action.payload);
    default:
      return state;
  }
}, moodsReducerInitialState);

export default combineReducers({
  searchCategory: searchCategoryReducer,
  ...moodsReducers
});

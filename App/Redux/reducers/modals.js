import { combineReducers } from 'redux';

import * as MODALS_ACTIONS from '../actions/modals';

const initialState = {
  isOpen: false,
  options: {}
};

function createModalReducer(name) {
  return function reducer(state = initialState, action) {
    if (!action || !action.payload || action.payload.name !== name) {
      return state;
    }

    switch (action.type) {
      case MODALS_ACTIONS.TOGGLE_MODAL:
        return {
          ...state,
          isOpen: action.payload.isOpen,
          options: action.payload.options
        };
      default:
        return state;
    }
  };
}

export default combineReducers({
  moodSelector: createModalReducer('moodSelector'),
  querySelector: createModalReducer('querySelector'),
  tagSelector: createModalReducer('tagSelector')
});

import { combineReducers } from 'redux';
import * as CONVERSATIONS_ACTIONS from '../actions/conversations';
import createMoodsReducer from '../createMoodsReducer';

const initialState = {
  isFetching: false,
  conversations: []
};

const addOrUpdateConversation = (state, { conversation }) => {
  const conversations = state.conversations.map((c) => {
    if (c.id === conversation.id) {
      return { ...c, ...conversation };
    }

    return c;
  });

  if (!conversations.some(c => c.id === conversation.id)) {
    conversations.push(conversation);
  }

  return {
    ...state,
    conversations
  };
};


function reducer(state, action) {
  switch (action.type) {
    case CONVERSATIONS_ACTIONS.SET_FETCHING:
      return { ...state, isFetching: action.payload.isFetching };
    case CONVERSATIONS_ACTIONS.SET_CONVERSATIONS:
      return { ...state, conversations: action.payload.conversations };
    case CONVERSATIONS_ACTIONS.ADD_OR_UPDATE_CONVERSATION:
      return addOrUpdateConversation(state, action.payload);
    default:
      return state;
  }
}

export default combineReducers(
  createMoodsReducer(reducer, initialState)
);

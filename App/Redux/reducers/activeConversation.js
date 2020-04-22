import * as ACTIVE_CONVERSATION_ACTIONS from '../actions/activeConversation';

const initialState = {
  conversationID: null,
  isFetching: false,
  input: '',
  isSending: false,
  target: null,
  mood: null,
  messages: [],
  uploads: []
};

const removeUploadFromState = (state, { id }) => {
  const uploads = state.uploads.filter(u => u.id !== id);

  return {
    ...state,
    uploads
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTIVE_CONVERSATION_ACTIONS.SET_FETCHING:
      return { ...state, ...action.payload };
    case ACTIVE_CONVERSATION_ACTIONS.SET_SENDING:
      return { ...state, ...action.payload };
    case ACTIVE_CONVERSATION_ACTIONS.START_CONVERSATION:
      return {
        ...state, ...action.payload, conversationID: null, uploads: []
      };
    case ACTIVE_CONVERSATION_ACTIONS.SET_INPUT_VALUE:
      return { ...state, input: action.payload.value };
    case ACTIVE_CONVERSATION_ACTIONS.SET_MESSAGES:
      return { ...state, messages: [...action.payload.messages] };
    case ACTIVE_CONVERSATION_ACTIONS.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload.message] };
    case ACTIVE_CONVERSATION_ACTIONS.SET_ACTIVE_CONVERSATION_ID:
      return { ...state, conversationID: action.payload.conversationID };
    case ACTIVE_CONVERSATION_ACTIONS.ADD_UPLOAD:
      return { ...state, uploads: [...state.uploads, action.payload.upload] };
    case ACTIVE_CONVERSATION_ACTIONS.REMOVE_UPLOAD:
      return removeUploadFromState(state, action.payload);
    default:
      return state;
  }
}

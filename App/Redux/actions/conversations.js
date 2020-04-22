import * as API from '../../Api';

export const SET_FETCHING = 'conversations/SET_FETCHING';
export const SET_CONVERSATIONS = 'conversations/SET_CONVERSATIONS';
export const ADD_OR_UPDATE_CONVERSATION = 'conversations/ADD_OR_UPDATE_CONVERSATION';

export function fetchConversation(mood, conversationId) {
  return async (dispatch) => {
    dispatch({
      type: SET_FETCHING,
      payload: {
        mood,
        isFetching: true
      }
    });
    try {
      const conversation = await API.Conversations.getById(conversationId);

      dispatch({
        type: ADD_OR_UPDATE_CONVERSATION,
        payload: {
          mood,
          conversation
        }
      });
    } catch (err) {
      console.warn(err);
      throw err;
    } finally {
      dispatch({
        type: SET_FETCHING,
        payload: {
          mood,
          isFetching: false
        }
      });
    }
  };
}

export function fetchConversations(mood) {
  return async (dispatch) => {
    dispatch({
      type: SET_FETCHING,
      payload: {
        mood,
        isFetching: true
      }
    });
    try {
      const conversations = await API.Conversations.getAll({ mood });

      dispatch({
        type: SET_CONVERSATIONS,
        payload: {
          mood,
          conversations
        }
      });
    } catch (err) {
      console.warn(err);
      throw err;
    } finally {
      dispatch({
        type: SET_FETCHING,
        payload: {
          mood,
          isFetching: false
        }
      });
    }
  };
}

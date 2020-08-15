import moment from 'moment';
import path from 'react-native-path';
import axios from 'axios';
import { Buffer } from 'buffer';

import * as API from '../../Api';
import * as CONVERSATIONS_ACTIONS from './conversations';
import * as UPLOADS_ACTIONS from './uploads';
import ENV from '../../environment';
import UtilsHelper from '../../Helpers/UtilsHelper';

export const SET_SENDING = 'activeConversation/SET_SENDING';
export const SET_ACTIVE_CONVERSATION_ID = 'activeConversation/SET_ACTIVE_CONVERSATION';
export const SET_FETCHING = 'activeConversation/SET_FETCHING';
export const SET_MESSAGES = 'activeConversation/SET_MESSAGES';
export const START_CONVERSATION = 'activeConversation/START_CONVERSATION';
export const SET_INPUT_VALUE = 'activeConversaion/SET_INPUT_VALUE';
export const ADD_MESSAGE = 'activeConversaion/ADD_MESSAGE';
export const ADD_UPLOAD = 'activeConversation/ADD_UPLOAD';
export const REMOVE_UPLOAD = 'activeConversation/REMOVE_UPLOAD';


export function fetchMessages() {
  return async (dispatch, getState) => {
    const {
      logguedUser: {
        user
      },
      activeConversation: {
        target
      },
      conversations,
      currentMood: mood
    } = getState();

    dispatch({
      type: SET_FETCHING,
      payload: {
        isFetching: true
      }
    });

    try {
      const messages = await API.Messages.fetchMessages({
        mood,
        user1: user.id,
        user2: target.id
      });

      dispatch({
        type: SET_MESSAGES,
        payload: {
          messages
        }
      });

      if (messages.length) {
        dispatch({
          type: SET_ACTIVE_CONVERSATION_ID,
          payload: {
            conversationID: messages[0].conversation
          }
        });
        const conversation = conversations[mood].conversations
          .find(c => c.user1.id === user.id || c.user2.id === user.id);

        if (conversation.user1.id === user.id) {
          conversation.user1unreadMessageCount = 0;
        } else {
          conversation.user2unreadMessageCount = 0;
        }

        dispatch({
          type: CONVERSATIONS_ACTIONS.ADD_OR_UPDATE_CONVERSATION,
          payload: {
            conversation
          }
        });
      }
    } catch (err) {
      console.warn(err);
      throw err;
    } finally {
      dispatch({
        type: SET_FETCHING,
        payload: {
          isFetching: false
        }
      });
    }
  };
}

export function createMessage(payload) {
  return async (dispatch) => {
    let message;

    dispatch({
      type: SET_SENDING,
      payload: {
        isSending: true
      }
    });

    try {
      try {
        message = await API.Messages.createMessage({
          sentAt: moment(),
          ...payload
        });

        dispatch({
          type: SET_INPUT_VALUE,
          payload: {
            value: ''
          }
        });
      } catch (err) {
        console.warn(err);
        throw new Error('Impossible de créer le message', err);
      }

      try {
        dispatch(addMessage(message));
      } catch (err) {
        throw new Error('Impossible de mettre à jour la conversation');
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      dispatch({
        type: SET_SENDING,
        payload: {
          isSending: false
        }
      });
    }
  };
}

export function createUpload({
  media,
  mood,
  target,
  content
}) {
  return async (dispatch, getState) => {
    const uploadId = `upload-conversation-${mood}-${target}`;
    const sentAt = moment().unix();

    dispatch({
      type: ADD_UPLOAD,
      payload: {
        upload: {
          id: uploadId,
          content,
          type: media.type,
          uri: media.uri
        }
      }
    });

    let filename;

    try {
      const ext = path.extname(media.uri);
      filename = `${Date.now().toString()}${ext}`;
      const { url } = await API.Storage.getPresignedUrl(filename);
      const { token, cancel } = axios.CancelToken.source();

      dispatch(UPLOADS_ACTIONS.startUpload(uploadId, media.uri, cancel));

      const base64 = media.type === 'image' ? media.base64 : await UtilsHelper.fileUriToBase64(media.uri);
      await axios.put(url, Buffer.from(base64, 'base64'), {
        onUploadProgress: (ev) => {
          const progress = Math.round((ev.loaded * 100) / ev.total);
          dispatch(UPLOADS_ACTIONS.setUploadProgress(uploadId, progress));
        },
        cancelToken: token
      });
    } catch (err) {
      if (axios.isCancel(err)) {
        return;
      }
      console.warn(err);
      throw new Error('Impossible de créer l\'upload');
    } finally {
      dispatch(UPLOADS_ACTIONS.stopUpload(uploadId));
      dispatch({
        type: REMOVE_UPLOAD,
        payload: {
          id: uploadId
        }
      });
    }

    const { user } = getState().logguedUser;

    const filePath = `${ENV.AWS_BUCKET_URL}/${user.id}/${filename}`;
    const message = {
      mood,
      target,
      sentAt,
      content
    };

    if (media.type === 'image') {
      message.image = filePath;
    } else {
      message.audio = filePath;
    }

    try {
      await dispatch(createMessage(message));
    } catch (err) {
      throw err;
    }
  };
}

export function addMessage(message) {
  return async (dispatch) => {
    dispatch({
      type: ADD_MESSAGE,
      payload: {
        message
      }
    });

    dispatch({
      type: SET_ACTIVE_CONVERSATION_ID,
      payload: {
        conversationID: message.conversation
      }
    });

    try {
      await dispatch(CONVERSATIONS_ACTIONS.fetchConversation(message.mood, message.conversation));
    } catch (err) {
      console.warn(err);
      throw new Error(err);
    }
  };
}

export function startConversation(mood, target) {
  return {
    type: START_CONVERSATION,
    payload: {
      mood,
      target
    }
  };
}

export function setInputValue(value) {
  return {
    type: SET_INPUT_VALUE,
    payload: {
      value
    }
  };
}

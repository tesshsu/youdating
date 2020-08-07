import * as API from '../../Api';

export const SET_FETCHING = 'bipolarityRequests/SET_FETCHING';
export const SET_BIPOLARITIES = 'bipolarityRequests/SET_BIPOLARITIES';
export const ADD_OR_UPDATE_BIPOLARITY= 'bipolarityRequests/ADD_OR_UPDATE_BIPOLARITY';
export const UPDATE_BIPOLARITY_RESULT = 'bipolarityRequests/UPDATE_BIPOLARITY_RESULT';

export function get(target, mood) {
  return async (dispatch) => {
    try {
      const bipolarityRequest = await API.BipolarityRequests.get({
        target,
        mood
      });



      dispatch({
        type: ADD_OR_UPDATE_BIPOLARITY,
        payload: {
          bipolarityRequest,
          mood
        }
      });
    } catch (err) {
      throw err;
    }
  };
}

export function create(target, mood) {
  return async (dispatch) => {
    try {
      const bipolarityRequest = await API.BipolarityRequests.create({
        target,
        mood
      });

      dispatch({
        type: ADD_OR_UPDATE_BIPOLARITY,
        payload: {
          bipolarityRequest,
          mood
        }
      });
    } catch (err) {
      throw err;
    }
  };
}

export function update(data) {
  return async (dispatch) => {
    try {
      const bipolarityRequest = await API.BipolarityRequests.update(data);

      /*dispatch({
        type: ADD_OR_UPDATE_BIPOLARITY,
        payload: {
          bipolarityRequest,
          data.mood
        }
      });*/
    } catch (err) {
      throw err;
    }
  };
}



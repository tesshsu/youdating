import * as API from '../../Api';

export const SET_FETCHING = 'bipolarityRequests/SET_FETCHING';
export const SET_BIPOLARITIES = 'bipolarityRequests/SET_BIPOLARITIES';
export const ADD_OR_UPDATE_BIPOLARITY= 'bipolarityRequests/ADD_BIPOLARITY_REQUEST';
export const UPDATE_BIPOLARITY_RESULT = 'bipolarityRequests/UPDATE_BIPOLARITY_RESULT';

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

export function fetchAll() {
  return async (dispatch) => {
    dispatch({
      type: SET_FETCHING,
      payload: {
        isFetching: true
      }
    });

    try {
      const crs = await API.BipolarityRequests.getAll();

      const moodsCr = crs.reduce((prev, curr) => {
        prev[curr.mood].push(curr);

        return prev;
      }, {
        PRO: [],
        LOVE: [],
        SOCIAL: [],
        PERSO: []
      });

      Object.keys(moodsCr).forEach((mood) => {
        dispatch({
          type: SET_BIPOLARITIES,
          payload: {
            bipolarityRequests: moodsCr[mood],
            mood
          }
        });
      });
    } catch (err) {
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

export function fetchById(crId) {
  return async (dispatch) => {
    try {
      const bipolarityRequest = await API.BipolarityRequests.getById(crId);

      dispatch({
        type: ADD_OR_UPDATE_BIPOLARITY,
        payload: {
          bipolarityRequest,
          mood: bipolarityRequest.mood
        }
      });
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}


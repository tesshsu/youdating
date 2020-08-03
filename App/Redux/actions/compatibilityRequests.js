import * as API from '../../Api';

export const SET_FETCHING = 'compatibilityRequests/SET_FETCHING';
export const SET_COMPATIBILITY_REQUESTS = 'compatibilityRequests/SET_COMPATIBILITY_REQUESTS';
export const ADD_OR_UPDATE_COMPATIBILITY_REQUEST = 'compatibilityRequests/ADD_COMPATIBILITY_REQUEST';
export const UPDATE_COMPATIBILITY_REQUEST = 'compatibilityRequests/UPDATE_COMPATIBILITY_REQUEST';

export function create(target, mood) {
  return async (dispatch) => {
    try {
      const compatibilityRequest = await API.CompatibilityRequests.create({
        target: target?.id,
        mood
      });

      dispatch({
        type: ADD_OR_UPDATE_COMPATIBILITY_REQUEST,
        payload: {
          compatibilityRequest,
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
      const crs = await API.CompatibilityRequests.getAll();
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
        dispatch(setCompatibilityRequests(moodsCr[mood], mood));
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
      const compatibilityRequest = await API.CompatibilityRequests.getById(crId);

      dispatch({
        type: ADD_OR_UPDATE_COMPATIBILITY_REQUEST,
        payload: {
          compatibilityRequest,
          mood: compatibilityRequest.mood
        }
      });
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}

export function accept(crId, mood) {
  return async (dispatch, getState) => {
    const { compatibilityRequests } = getState();

    const compatibilityRequest = compatibilityRequests[mood].find(cr => cr.id === crId);
    try {
      await API.CompatibilityRequests.updateHasBeenAccepted(crId);

      dispatch({
        type: ADD_OR_UPDATE_COMPATIBILITY_REQUEST,
        payload: {
          compatibilityRequest: {
            ...compatibilityRequest,
            hasBeenAccepted: true
          }
        }
      });
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}

export function setCompatibilityRequests(compatibilityRequests, mood) {
  return {
    type: SET_COMPATIBILITY_REQUESTS,
    payload: {
      compatibilityRequests,
      mood
    }
  };
}
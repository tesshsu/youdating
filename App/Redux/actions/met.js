import * as API from '../../Api';

export const SET_FETCHING = 'met/SET_FETCHING';
export const SET_RESULTS = 'met/SET_RESULTS';

export function searchNear(mood) {
  return async (dispatch) => {
    dispatch({
      type: SET_FETCHING,
      payload: {
        isFetching: true
      }
    });

    dispatch({
      type: SET_RESULTS,
      payload: {
        results: []
      }
    });

    try {
      const results = await API.User.searchNear(mood);
      dispatch({
        type: SET_RESULTS,
        payload: {
          results
        }
      });
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

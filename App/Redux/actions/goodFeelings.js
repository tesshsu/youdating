import * as API from '../../Api';

export const SET_FETCHING = 'goodFeelings/SET_FETCHING';
export const SET_GOOD_FEELINGS = 'goodFeelings/SET_GOOD_FEELINGS';
export const ADD_GOOD_FEELING = 'goodFeelings/ADD_GOOD_FEELING';

export function fetchAll() {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_FETCHING,
        payload: {
          isFetching: true
        }
      });

      const goodFeelings = await API.GoodFeelings.get();

      const goodFeelingsOfMood = goodFeelings.reduce((acc, curr) => {
        acc[curr.mood].push(curr);

        return acc;
      }, {
        PRO: [],
        LOVE: [],
        SOCIAL: [],
        PERSO: []
      });

      Object.keys(goodFeelingsOfMood).forEach((mood) => {
        dispatch(setGoodFeelings(goodFeelingsOfMood[mood], mood));
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

export function createGoodFeeling(target, mood) {
  return async (dispatch) => {
    try {
      const goodFeeling = await API.GoodFeelings.create({
        target,
        mood
      });

      if (goodFeeling !== '') {
        dispatch({
          type: ADD_GOOD_FEELING,
          payload: {
            goodFeeling,
            mood
          }
        });
      }
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}

export function setGoodFeelings(goodFeelings, mood) {
  return {
    type: SET_GOOD_FEELINGS,
    payload: {
      goodFeelings,
      mood
    }
  };
}

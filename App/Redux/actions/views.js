import * as API from '../../Api';

export const SET_FETCHING = 'views/SET_FETCHING';
export const SET_VIEWS = 'views/SET_VIEWS';
export const ADD_VIEW = 'views/ADD_VIEW';

export function fetchAll() {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_FETCHING,
        payload: {
          isFetching: true
        }
      });

      const views = await API.Views.get();

      const viewsOfMood = views.reduce((acc, curr) => {
        acc[curr.mood].push(curr);

        return acc;
      }, {
        PRO: [],
        LOVE: [],
        SOCIAL: [],
        PERSO: []
      });

      Object.keys(viewsOfMood).forEach((mood) => {
        dispatch(setViews(viewsOfMood[mood], mood));
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

export function createView(target, mood) {
  return async (dispatch) => {
    try {
      const view = await API.Views.create({
        target,
        mood
      });

      if (view !== '') {
        dispatch({
          type: ADD_VIEW,
          payload: {
            view,
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

export function setViews(views, mood) {
  return {
    type: SET_VIEWS,
    payload: {
      views,
      mood
    }
  };
}

export function addView(view, mood) {
  return {
    type: ADD_VIEW,
    payload: {
      view,
      mood
    }
  };
}

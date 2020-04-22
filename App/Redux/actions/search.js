import * as API from '../../Api';

export const SET_CATEGORY = 'search/SET_CATEGORY';
export const SEARCH = 'search/SET_SEARCH';
export const SET_SEARCH_TERM = 'search/SET_SEARCH_TERM';
export const SET_RESULTS = 'search/SET_RESULTS';
export const ADD_RECENT = 'search/ADD_RECENT';

export function setCategory(category) {
  return {
    type: SET_CATEGORY,
    payload: {
      category,
    }
  };
}

export function search(payload, mood) {
  return async (dispatch, getState) => {
    try {
      const results = await API.User.search({ ...payload, mood });
      const { searchTerm } = getState().search[mood];

      if (searchTerm && searchTerm !== '') {
        dispatch(setResults(results, mood));
      } else {
        dispatch(setResults([], mood));
      }
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}

export function setSearchTerm(searchTerm, mood) {
  return {
    type: SET_SEARCH_TERM,
    payload: {
      searchTerm,
      mood
    }
  };
}

export function setResults(results, mood) {
  return {
    type: SET_RESULTS,
    payload: {
      mood,
      results
    }
  };
}

export function addRecent(user, mood) {
  return {
    type: ADD_RECENT,
    payload: {
      user,
      mood
    }
  };
}

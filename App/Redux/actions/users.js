import { MOODS } from '../../GlobalConfig';
import * as API from '../../Api';

export const ADD_USER = 'users/ADD_USERS';
export const ADD_USERS = 'users/ADD_USERS';
export const SET_USERS = 'users/SET_USERS';
export const UPDATE_USER = 'users/UPDATE_USER';

export function fetchUser(id) {
  return async (dispatch) => {
    try {
      const user = await API.User.getUser(id);

      dispatch({
        type: ADD_USER,
        payload: {
          user
        }
      });
    } catch (err) {
      console.warn(err);
      throw err;
    }
  };
}

export function addUsers(users = []) {
  return {
    type: ADD_USERS,
    payload: {
      users
    }
  };
}

export function setUsers(users = {}) {
  return {
    type: SET_USERS,
    payload: {
      users
    }
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: {
      user
    }
  };
}

export function purge() {
  return (dispatch, getState) => {
    const {
      users,
      search
    } = getState();

    const allIds = Object
      .keys(MOODS)
      .reduce((acc, curr) => acc.concat(search[curr].results), []);

    const purgedUsers = Object
      .values(users)
      .filter(u => allIds.some(id => id === u.id))
      .reduce((acc, curr) => {
        acc[curr.id] = curr;

        return acc;
      }, {});

    dispatch(setUsers(purgedUsers));
  };
}

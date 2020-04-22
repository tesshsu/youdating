import * as USERS_ACTIONS from '../actions/users';

const addUsersInState = (state, { users }) => {
  const newUsers = users.reduce((acc, curr) => {
    acc[curr.id] = curr;

    return acc;
  }, {});

  return {
    ...state,
    ...newUsers
  };
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case USERS_ACTIONS.ADD_USER:
      return { ...state, [action.payload.user.id]: action.payload.user };
    case USERS_ACTIONS.ADD_USERS:
      return addUsersInState(state, action.payload);
    case USERS_ACTIONS.SET_USERS:
      return { ...action.payload.users };
    case USERS_ACTIONS.UPDATE_USER:
      return { ...state, [action.payload.user.id]: action.payload.user };
    default:
      return state;
  }
}

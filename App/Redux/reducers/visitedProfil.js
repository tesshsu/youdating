import * as VISITED_PROFIL_ACTIONS from '../actions/visitedProfil';

export default function reducer(state = null, action) {
  switch (action.type) {
    case VISITED_PROFIL_ACTIONS.SET_VISITED_PROFIL:
      return action.payload.userId;
    default:
      return state;
  }
}

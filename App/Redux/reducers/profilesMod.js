import * as PROFILES_MOD_ACTIONS from '../actions/profilesMod';

const initialState = 'GRID';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PROFILES_MOD_ACTIONS.TOGGLE:
      return state === 'GRID' ? 'SINGLE' : 'GRID';
    default:
      return state;
  }
}

import * as LOADING_OVERLAY_ACTIONS from '../actions/loadingOverlay';

const initialState = {
  isVisible: false,
  text: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_OVERLAY_ACTIONS.SET_VISIBILITY:
      return {
        ...state,
        isVisible: action.payload.isVisible,
        text: action.payload.text || null
      };
    default:
      return state;
  }
}

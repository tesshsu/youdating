import * as UPLOADS_ACTIONS from '../actions/uploads';

const initialState = [];

const setUploadProgress = (state, { id, progress }) => state.map((u) => {
  if (id === u.id) {
    return { ...u, progress };
  }

  return u;
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPLOADS_ACTIONS.START_UPLOAD:
      return [...state, { ...action.payload, progress: 0 }];
    case UPLOADS_ACTIONS.SET_UPLOAD_PROGRESS:
      return setUploadProgress(state, action.payload);
    case UPLOADS_ACTIONS.STOP_UPLOAD:
      return state.filter(u => u.id !== action.payload.id);
    default:
      return state;
  }
}

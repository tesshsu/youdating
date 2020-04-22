import * as GALLERY_PHOTOS_ACTIONS from '../actions/galleryPhotos';

const initialState = {
  photos: [],
  currentIndex: 0,
};

export default function galleryPhotos(state = initialState, action) {
  switch (action.type) {
    case GALLERY_PHOTOS_ACTIONS.SETUP:
      return action.payload;
    default:
      return state;
  }
}

import { useSelector, useDispatch } from 'react-redux';
import * as GALLERY_PHOTOS_ACTIONS from '../Redux/actions/galleryPhotos';

export default function useGalleryPhotos() {
  const galleryPhotos = useSelector(state => state.galleryPhotos);
  const dispatch = useDispatch();

  function setup(photos, currentIndex) {
    dispatch(GALLERY_PHOTOS_ACTIONS.setup(photos, currentIndex));
  }

  return {
    ...galleryPhotos,
    setup
  };
}

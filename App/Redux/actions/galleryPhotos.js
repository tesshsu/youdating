export const SETUP = 'galleryPhotos/SETUP';

export function setup(photos, currentIndex) {
  return {
    type: SETUP,
    payload: {
      photos,
      currentIndex
    }
  };
}

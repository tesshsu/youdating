export const SET_VISIBILITY = 'loadingOverlay/SET_VISIBILITY';

export function setVisibility(isVisible, text = null) {
  return {
    type: SET_VISIBILITY,
    payload: {
      isVisible,
      text
    }
  };
}

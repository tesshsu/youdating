import { useSelector, useDispatch } from 'react-redux';

import * as LOADING_OVERLAY_ACTIONS from '../Redux/actions/loadingOverlay';

export default function useLoadingOverlay() {
  const loadingOverlay = useSelector(state => state.loadingOverlay);
  const dispatch = useDispatch();

  function setVisibility(isVisible, text = null) {
    dispatch(
      LOADING_OVERLAY_ACTIONS.setVisibility(
        isVisible,
        text
      )
    );
  }

  return {
    ...loadingOverlay,
    setVisibility
  };
}

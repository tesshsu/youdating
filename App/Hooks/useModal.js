import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as MODALS_ACTIONS from '../Redux/actions/modals';

export default function useModal(name) {
  const isOpen = useSelector(state => state.modals[name].isOpen);
  const modalOptions = useSelector(state => state.modals[name].options);
  const dispatch = useDispatch();

  const openModal = useCallback((options = {}) => {
    dispatch(
      MODALS_ACTIONS
        .openModal(name, options)
    );
  }, [name, dispatch]);

  const closeModal = useCallback(() => {
    dispatch(
      MODALS_ACTIONS
        .closeModal(name)
    );
  }, [name, dispatch]);

  return {
    openModal,
    closeModal,
    isOpen,
    modalOptions
  };
}

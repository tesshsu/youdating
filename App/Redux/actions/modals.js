export const TOGGLE_MODAL = 'modals/TOGGLE_MODAL';

export const openModal = (name, options = {}) => ({
  type: TOGGLE_MODAL,
  payload: {
    name,
    isOpen: true,
    options
  }
});

export const closeModal = name => ({
  type: TOGGLE_MODAL,
  payload: {
    name,
    isOpen: false,
    options: {}
  }
});

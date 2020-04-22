export default function createFormReducer(name) {
  return function reducer(state = {}, action) {
    if (action.payload.formName !== name) {
      return state;
    }

    switch (action.type) {
      default:
        return state;
    }
  };
}

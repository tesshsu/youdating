export const SET_FIELD = 'Forms/SET_FIELD';

export function setField(formName, key, value) {
  return {
    type: SET_FIELD,
    payload: {
      formName,
      key,
      value
    }
  };
}

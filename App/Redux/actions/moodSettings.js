export const SET_SETTINGS = 'moodSettings/SET_SETTINGS';

export function setSettings(mood, settings) {
  return {
    type: SET_SETTINGS,
    payload: {
      mood,
      settings
    }
  };
}

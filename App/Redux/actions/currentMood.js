export const SET_MOOD = 'CurrentMood/SET_MOOD';

export const setMood = mood => ({
  type: SET_MOOD,
  payload: {
    mood
  }
});

export const SET_VISITED_PROFIL = 'currentUser/SET_VISITED_PROFIL';

export function setVisitedProfil(userId) {
  return {
    type: SET_VISITED_PROFIL,
    payload: {
      userId
    }
  };
}

import { useSelector, useDispatch } from 'react-redux';
import { useMemo, useCallback } from 'react';

import useUsers from './useUsers';
import * as VISIT_PROFIL_ACTIONS from '../Redux/actions/visitedProfil';
import NavigationHelper from '../Helpers/NavigationHelper';
import { useViews } from './useViews';
import useCurrentMood from './useCurrentMood';
import useGoodFeelings from './useGoodFeelings';

export default function useVisitedProfil() {
  const { users, fetchUser } = useUsers();
  const { createView } = useViews();
  const { currentMood } = useCurrentMood();
  const { received: receivedGoodFeelings, sent: sentGoodFeelings } = useGoodFeelings();
  const userId = useSelector(state => state.visitedProfil);
  const profil = useMemo(() => users[userId] || null, [users, userId]);
  const gotFullAccess = useMemo(() => {
    const gotReceived = receivedGoodFeelings.some(g => g.author.id === userId);
    const gotSent = sentGoodFeelings.some(g => g.target.id === userId);

    return gotReceived && gotSent;
  }, [receivedGoodFeelings, sentGoodFeelings, userId]);
  const dispatch = useDispatch();

  const visitProfil = useCallback(async (id) => {
    await dispatch(VISIT_PROFIL_ACTIONS.setVisitedProfil(id));

    try {
      await fetchUser(id);
    } catch (err) {
      throw new Error('Impossible de récupérer le profil de l\'utilisateur', err);
    }

    try {
      await createView(id, currentMood);
    } catch (err) {
      throw new Error('Impossible de créer la vue', err);
    }

    NavigationHelper.navigate('MainVisitedProfil');
  }, [createView, currentMood, dispatch, fetchUser]);

  return {
    profil,
    gotFullAccess,
    visitProfil
  };
}

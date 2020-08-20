import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert } from 'react-native';

import useCurrentMood from './useCurrentMood';
import * as GOOD_FEELING_ACTIONS from '../Redux/actions/goodFeelings';
import useLogguedUser from './useLogguedUser';
import useNotifications from './useNotifications';

export default function useGoodFeelings() {
  const { logguedUser } = useLogguedUser();
  const { currentMood, moodInfos } = useCurrentMood();
  const { showNotification } = useNotifications();
  const { isFetching, ...moodsGoodFeeling } = useSelector(state => state.goodFeelings);
  const dispatch = useDispatch();

  const goodFeelings = useMemo(() => moodsGoodFeeling[currentMood], [currentMood, moodsGoodFeeling]);

  const { sent, received } = useMemo(() => ({
    sent: logguedUser === null ? [] : goodFeelings.filter(g => g.author.id === logguedUser.id),
    received: logguedUser === null ? [] : goodFeelings.filter(g => g.target.id === logguedUser.id)
  }), [goodFeelings, logguedUser]);

  const sendGoodFeeling = useCallback(async (user) => {
    const sendedGoodFeeling = sent.find(s => s.target.id === user.id);

    if (sendedGoodFeeling) {
      Alert.alert('Good feeling déjà envoyé!');
      return;
    }

    const send = async () => {
      try {
        await dispatch(GOOD_FEELING_ACTIONS.createGoodFeeling(user.id, currentMood));

        showNotification({
          title: `MOOD ${moodInfos.title}`,
          text: `Vous avez envoyé un good feeling à ${user.firstName} !`,
          image: user?.moods[currentMood]?.avatar,
          duration: 4000,
          color: moodInfos.color
        });
      } catch (err) {
        Alert.alert('Erreur', 'Impossible d\'envoyer un good feeling.');
      }
    };

    Alert.alert(
      'Good Feeling',
      'Vous confirmez vouloir envoyer un good feeling',
      [
        { text: 'Envoyer un good feeling', style: 'default', onPress: send },
        { text: 'Annuler', style: 'cancel' }
      ]
    );
  }, [currentMood, dispatch, moodInfos, sent, showNotification]);

  const fetchAll = useCallback(() => dispatch(GOOD_FEELING_ACTIONS.fetchAll()), [dispatch]);

  return {
    isFetching,
    goodFeelings,
    sent,
    received,
    sendGoodFeeling,
    fetchAll
  };
}

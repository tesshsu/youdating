import { useDispatch, useSelector } from 'react-redux';

import * as PROFILES_MOD_ACTIONS from '../Redux/actions/profilesMod';

export default function useProfilesMod() {
  const profilesMod = useSelector(state => state.profilesMod);

  const dispatch = useDispatch();

  function toggleMod() {
    dispatch(PROFILES_MOD_ACTIONS.toggleMod());
  }

  return {
    profilesMod,
    toggleMod
  };
}

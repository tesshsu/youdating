import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import useProfilesMod from '../../../../../Hooks/useProfilesMod';
import { verticalScale } from '../../../../../Helpers/ScaleHelper';

export default function ProfilesModToggler() {
  const {
    profilesMod,
    toggleMod
  } = useProfilesMod();

  return (
    <FontAwesome5
      name={profilesMod === 'GRID' ? 'th-large' : 'square'}
      solid
      size={verticalScale(19)}
      color="white"
      onPress={() => toggleMod()}
    />
  );
}

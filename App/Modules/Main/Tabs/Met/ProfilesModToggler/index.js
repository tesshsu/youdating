import React from 'react';
import { Feather } from '@expo/vector-icons';
import useProfilesMod from '../../../../../Hooks/useProfilesMod';
import { verticalScale } from '../../../../../Helpers/ScaleHelper';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';
export default function ProfilesModToggler() {
  const {
    profilesMod,
    toggleMod
  } = useProfilesMod();

  return (
    <Feather
         name="chevron-left"
         color='white'
         size={21}
         onPress={() => NavigationHelper.navigate('MainTabsProfile')}
     />
  );
}

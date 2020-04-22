import React from 'react';
import { Feather } from 'react-native';
import { verticalScale } from '../../../../../Helpers/ScaleHelper';

export default function ProfilePhotoButton() {
  return (
    <Feather
      name="instagram"
      color="white"
      size={verticalScale(28)}
    />
  );
}

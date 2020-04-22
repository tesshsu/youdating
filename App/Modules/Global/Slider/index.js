import React from 'react';
import { Slider as NativeSlider } from 'react-native';
import useCurrentMood from '../../../Hooks/useCurrentMood';

export default function Slider(props) {
  const { moodInfos } = useCurrentMood();

  return (
    <NativeSlider
      minimumTrackTintColor={moodInfos.color}
      {...props}
    />
  );
}

Slider.propTypes = {
  ...Slider.propTypes
};

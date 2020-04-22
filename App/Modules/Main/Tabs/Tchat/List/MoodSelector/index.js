import React from 'react';
import { Feather } from '@expo/vector-icons';
import useModal from '../../../../../../Hooks/useModal';

export default function MoodSelector() {
  const { openModal } = useModal('moodSelector');

  return (
    <Feather
      name="align-justify"
      size={20}
      color="white"
      onPress={() => openModal({
        moods: [
          'PRO',
          'SOCIAL',
          'LOVE',
          'PERSO'
        ]
      })}
    />
  );
}

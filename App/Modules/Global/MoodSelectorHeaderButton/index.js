import React from 'react';
import PropTypes from 'prop-types';

import useModal from '../../../Hooks/useModal';
import ImageButton from '../ImageButton';

import styles from './styles';

const IMAGE_MOOD = require('../../../../assets/icons/btn-mood.png');

export default function MoodSelectorHeaderButton(props) {
  const {
    moods
  } = props;

  const { openModal } = useModal('moodSelector');

  return (
    <ImageButton
      imageSource={IMAGE_MOOD}
      imageStyle={styles.image}
      onPress={() => openModal({ moods })}
    />
  );
}

MoodSelectorHeaderButton.propTypes = {
  moods: PropTypes.arrayOf(
    PropTypes.string
  )
};

MoodSelectorHeaderButton.defaultProps = {
  moods: [
    'PRO',
    'SOCIAL',
    'LOVE',
    'PERSO'
  ]
}

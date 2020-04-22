import React from 'react';
import {
  Text,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';
import useCurrentMood from '../../../Hooks/useCurrentMood';
import useModal from '../../../Hooks/useModal';

export default function MoodSelector(props) {
  const {
    containerStyle,
    inverted,
    moods
  } = props;
  const { moodInfos } = useCurrentMood();
  const { openModal } = useModal('moodSelector');

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: inverted ? 'white' : moodInfos.color },
        containerStyle
      ]}
      onPress={() => openModal({ moods })}
    >
      <Text
        style={[
          styles.text,
          { color: inverted ? moodInfos.color : 'white' }
        ]}
      >
        {`MOOD ${moodInfos.title}`}
      </Text>
      <Feather
        style={styles.icon}
        name="chevron-down"
        size={30}
        color={inverted ? moodInfos.color : 'white'}
      />
    </TouchableOpacity>
  );
}

MoodSelector.propTypes = {
  containerStyle: ViewPropTypes.style,
  moods: PropTypes.arrayOf(
    PropTypes.string
  )
};

MoodSelector.defaultProps = {
  containerStyle: {},
  moods: ['PRO', 'LOVE', 'SOCIAL', 'PERSO']
};

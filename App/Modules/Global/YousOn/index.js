import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import styles from './styles';
import useCurrentMood from '../../../Hooks/useCurrentMood';
import { scale, verticalScale } from '../../../Helpers/ScaleHelper';

export default function YousOn(props) {
  const {
    online,
    position,
    size,
    offlineColor,
    children
  } = props;

  const { moodInfos } = useCurrentMood();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.badge,
          { ...position },
          { backgroundColor: online ? moodInfos.color : offlineColor },
          { width: size, height: size, borderRadius: size / 2 }
        ]}
      />
      { children }
    </View>
  );
}

YousOn.defaultProps = {
  online: false,
  position: {
    right: scale(-5),
    top: verticalScale(-1)
  },
  size: verticalScale(6),
  offlineColor: 'black'
};

YousOn.propTypes = {
  online: PropTypes.bool,
  position: PropTypes.shape({
    left: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    top: PropTypes.number,
  }),
  size: PropTypes.number,
  offlineColor: PropTypes.string
};

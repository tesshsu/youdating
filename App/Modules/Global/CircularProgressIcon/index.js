import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import * as ICONS_PROVIDERS from '@expo/vector-icons';

import { View } from 'react-native';
import styles from './styles';
import CircularProgress from './CircularProgress';

export default function CircularProgressIcon(props) {
  const {
    progress,
    backgroundColor,
    color,
    size,
    strokeWidth,
    iconName,
    iconColor,
    iconSize,
    IconProvider
  } = props;

  const contentSize = useMemo(() => size - strokeWidth * 2, [size, strokeWidth]);

  return (
    <View>
      <CircularProgress
        radius={size / 2}
        bg={backgroundColor}
        fg={color}
        progress={progress}
      />
      <View style={[
        styles.container,
        {
          top: strokeWidth,
          left: strokeWidth,
          right: strokeWidth,
          bottom: strokeWidth,
          backgroundColor,
          borderRadius: contentSize / 2
        }
      ]}
      >
        <IconProvider
          name={iconName}
          style={{
            top: (contentSize - iconSize) / 2,
            left: (contentSize - iconSize) / 2
          }}
          color={iconColor || color}
          size={iconSize}
        />
      </View>
    </View>
  );
}

CircularProgressIcon.defaultProps = {
  iconColor: null,
  IconProvider: ICONS_PROVIDERS.Feather
};

CircularProgressIcon.propTypes = {
  progress: PropTypes.instanceOf(Animated.Node).isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  iconName: PropTypes.string.isRequired,
  iconSize: PropTypes.number.isRequired,
  iconColor: PropTypes.string,
  IconProvider: PropTypes.oneOf(Object.values(ICONS_PROVIDERS)),
};

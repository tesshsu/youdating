import React from 'react';
import {
  TouchableOpacity,
  ViewPropTypes,
  Image,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Feather,
  AntDesign,
  Entypo,
  EvilIcons,
  FontAwesome,
  FontAwesome5,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial
} from '@expo/vector-icons';

import styles from './styles';

export default function RoundIconButton(props) {
  const {
    backgroundColor,
    size,
    containerStyle,
    iconContainerStyle,
    onPress,
    disabled,
    IconProvider,
    iconName,
    iconColor,
    iconSize,
    imageSource,
    imageStyle
  } = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.button,
        containerStyle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor
        }
      ]}
      onPress={onPress}
    >
      { imageSource !== null ? (
        <Image
          source={imageSource}
          style={imageStyle}
        />
      ) : (
        <View style={iconContainerStyle}>
          <IconProvider
            name={iconName}
            size={iconSize}
            color={iconColor}
          />
        </View>
      ) }
    </TouchableOpacity>
  );
}

RoundIconButton.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  containerStyle: ViewPropTypes.style,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  imageSource: PropTypes.node,
  imageStyle: ViewPropTypes.style,
  IconProvider: PropTypes.oneOf([
    Feather,
    AntDesign,
    Entypo,
    EvilIcons,
    FontAwesome,
    FontAwesome5,
    Foundation,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
    Octicons,
    SimpleLineIcons,
    Zocial
  ]),
  iconName: PropTypes.string,
  iconSize: PropTypes.number,
  iconColor: PropTypes.string,
  iconContainerStyle: ViewPropTypes.style,
};

RoundIconButton.defaultProps = {
  containerStyle: {},
  iconContainerStyle: {},
  onPress: null,
  imageStyle: {},
  disabled: false,
  imageSource: null,
  IconProvider: Feather,
  iconName: '',
  iconSize: 0,
  iconColor: 'blue',
};

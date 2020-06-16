import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Image,
  ViewPropTypes
} from 'react-native';

export default function ImageButton(props) {
  const {
    containerStyle,
    onPress,
    disabled,
    imageStyle,
    imageSource,
  } = props;

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled}
    >
      <Image
        style={imageStyle}
        source={imageSource}
      />
    </TouchableOpacity>
  );
}

ImageButton.propTypes = {
  containerStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  imageSource: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape({
      uri: PropTypes.string.isRequired
    })
  ]).isRequired
};
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import styles from './styles';
import useCurrentMood from '../../../Hooks/useCurrentMood';

function renderText(item, style) {
  if (!item) {
    return null;
  }

  if (typeof item === 'function') {
    return item({ style });
  }

  return (
    <Text style={style}>
      {item}
    </Text>
  );
}

export default function UserListItem(props) {
  const {
    image,
    title,
    subTitle,
    subSubTitle,
    rightText,
    onConsultProfil
  } = props;

  const { moodInfos } = useCurrentMood();

  return (
    <View style={styles.container}>
      <Image style={styles.image} uri={image} />
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        { renderText(subTitle, styles.subTitle) }
        { renderText(subSubTitle, styles.subSubTitle) }
      </View>
      <View style={styles.right}>
        <Text>{ renderText(rightText, styles.rightText) }</Text>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: moodInfos.color }
          ]}
          onPress={onConsultProfil}
        >
          <Text style={styles.buttonText}>CONSULTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

UserListItem.defaultProps = {
  subTitle: null,
  subSubTitle: null,
  rightText: null
};

UserListItem.propTypes = {
  image: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  subSubTitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  rightText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  onConsultProfil: PropTypes.func.isRequired
};

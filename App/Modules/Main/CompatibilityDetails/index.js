import React from 'react';
import {
  Text,
  ImageBackground
} from 'react-native';

import styles from './styles';
import useCurrentMood from '../../../Hooks/useCurrentMood';
import RoundIconButton from '../../Global/RoundIconButton';
import { verticalScale } from '../../../Helpers/ScaleHelper';
import NavigationHelper from '../../../Helpers/NavigationHelper';

const IMAGE_BACKGROUND_PRO = require('../../../../assets/images/image_background_pro.png');
const IMAGE_BACKGROUND_SOCIALE = require('../../../../assets/images/image_background_social.png');
const IMAGE_BACKGROUND_PERSO = require('../../../../assets/images/image_background_perso.png');
const IMAGE_BACKGROUND_LOVE = require('../../../../assets/images/image_background_love.png');

const IMAGES = {
  PRO: IMAGE_BACKGROUND_PRO,
  SOCIAL: IMAGE_BACKGROUND_SOCIALE,
  PERSO: IMAGE_BACKGROUND_PERSO,
  LOVE: IMAGE_BACKGROUND_LOVE
};

export default function CompatibilityDetails({ navigation }) {
  const { moodInfos, currentMood } = useCurrentMood();

  const user = navigation.getParam('user');

  if (!user) {
    return (null);
  }

  return (
    <ImageBackground
      style={styles.container}
      source={IMAGES[currentMood]}
    >
      <Text style={styles.matchingText}>Matching</Text>
      <Text style={styles.usernameText}>Clara</Text>
      <Text style={styles.compatibilityText}>{`Compatibilité ${moodInfos.titleFeminize}`}</Text>
      <ImageBackground
        style={styles.imageBackground}
        imageStyle={styles.imagebackgroundImage}
        source={user.avatar}
      >
        <Text
          style={[
            styles.resultValueText,
            { color: moodInfos.color }
          ]}
        >
          Faible
        </Text>
      </ImageBackground>
      <Text
        style={[
          styles.personnalityText,
          { color: moodInfos.color }
        ]}
      >
        Leaderent
      </Text>
      <Text style={styles.personnalityTypeText}>Personnalité directive</Text>
      <Text style={styles.personnalityDescText} numberOfLines={3}>
        {'Il faudra faire des efforts l\'un envers l\'autre  si vous  voulez reussir a atteindre une excellente compatibilite'}
      </Text>
      <RoundIconButton
        backgroundColor={moodInfos.color}
        size={verticalScale(50)}
        iconColor="white"
        iconName="x"
        iconSize={verticalScale(20)}
        onPress={() => NavigationHelper.back()}
      />
    </ImageBackground>
  );
}

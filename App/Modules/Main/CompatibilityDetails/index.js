import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  ImageBackground
} from 'react-native';

import styles from './styles';
import { Image } from 'react-native-expo-image-cache';
import useCurrentMood from '../../../Hooks/useCurrentMood';
import RoundIconButton from '../../Global/RoundIconButton';
import { verticalScale } from '../../../Helpers/ScaleHelper';
import useLogguedUser from '../../../Hooks/useLogguedUser';
import useCompatibilityRequests from '../../../Hooks/useCompatibilityRequests';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import Button from '../../Global/Button';
const IMAGE_BACKGROUND_PRO = require('../../../../assets/images/match/professionnel/insuf.png');
const IMAGE_BACKGROUND_SOCIALE = require('../../../../assets/images/match/couple/insuf.png');
const IMAGE_BACKGROUND_PERSO = require('../../../../assets/images/match/personnel/insuf.png');
const IMAGE_BACKGROUND_LOVE = require('../../../../assets/images/match/couple/insuf.png');

const IMAGES = {
  PRO: IMAGE_BACKGROUND_PRO,
  SOCIAL: IMAGE_BACKGROUND_SOCIALE,
  PERSO: IMAGE_BACKGROUND_PERSO,
  LOVE: IMAGE_BACKGROUND_LOVE
};

export default function CompatibilityDetails({ navigation }) {
  const { moodInfos, currentMood } = useCurrentMood();
  const { logguedUser } = useLogguedUser();
  const [datas, setDatas] = useState(null);
  const [conversation, setConversation] = useState(null)

  console.log(datas);
  console.log(conversation);

  const { fetchAll: fetchAllCompatibilityRequests, fetch } = useCompatibilityRequests();
  const user = navigation.getParam('user');

  if (!user) {
    return (null);
  }

  let imageSource, firstName, personnality;
  const { user1, user2 } = user;
  const target = user1.id === logguedUser.id ? user2 : user1;
  const { moods, personalities } = target;
  imageSource = moods[currentMood].avatar;
  firstName = target.firstName;
  personnality = personalities.main;


  return (
    <ImageBackground
      style={styles.container}
      source={IMAGES[currentMood]}
    >
      <Text style={styles.matchingTextYous}>YOU'S</Text>
	  <Text style={styles.matchingText}>MATCHING</Text>
	  <Button
        text={moodInfos.match.mauvaise.title}
        size={verticalScale(50)}
        onPress={() => NavigationHelper.back()}
      />
	  <Image
            uri={imageSource}
            style={[styles.imageBackground]}
       />
      <Text style={styles.personnalityDescText}>
        Dans cette relation vous etes complementaire avec {firstName}
      </Text>
      <Text style={styles.personnalityTypeText}>{personnality}</Text>
      <Text style={styles.personnalityDescText} numberOfLines={3}>
        mais rien de grave avec plus de volonté et d'implication, vos plus grandes faiblesses pourraient vite
		devenir vos plus grandes forces.
		Dans la configuration actuelle, vous risquez d'avoir des difficultés à vous entendre sur la manière de
		procéder. Aucun de vous n'est véritablement satisfait du comportement de l'autre. Vos attentes étant
		différentes, votre collaboration risque inévitablement d'en souffrir ce qui pourrait a terme vous empêcher
		d'evoluer plus sérieusement dans des projets en communs. Essayez donc d'être plus conciliant et
		apprenez a mieux comprendre la pensée de l'autre pour être plus performant dans votre partenariat.
      </Text>
      <Button
        text={'REVENIR PLUS TARD'}
        size={verticalScale(50)}
        onPress={() => NavigationHelper.back()}
      />
    </ImageBackground>
  );
}

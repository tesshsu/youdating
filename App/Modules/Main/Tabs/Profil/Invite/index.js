import React, { useState } from 'react';
import {
  Share,
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import PageHeader from '../../../../Global/PageHeader';
import MoodSelector from '../../../../Global/MoodSelector';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import { ShareDialog } from 'react-native-fbsdk';
const IMAGE_PRO = require('../../../../../../assets/images/invite_pro.png');
const IMAGE_LOVE = require('../../../../../../assets/images/invite_love.png');
const IMAGE_SOCIAL = require('../../../../../../assets/images/invite_social.png');
const IMAGE_PERSO = require('../../../../../../assets/images/invite_perso.png');

const IMAGES = {
  PRO: IMAGE_PRO,
  LOVE: IMAGE_LOVE,
  SOCIAL: IMAGE_SOCIAL,
  PERSO: IMAGE_PERSO
};

const TITLES = {
  PRO: 'Elargis ton réseau',
  LOVE: 'Trouves la personne idéale',
  SOCIAL: 'Enrichis ton cercle d\'amis',
  PERSO: 'Decouvres ta compatibilité'
};

export default function Invite() {
  const {
    currentMood,
    moodInfos
  } = useCurrentMood(); 
  
 function sahreClick() {
  Share.share({
    message: "hey, ca te dirais d'installer l'application You's pour découvrir notre compatibilité",
    url: 'https://www.yousdating.com/',
    title: 'Partager You?'
  }, {
    // Android only:
    dialogTitle: 'Share BAM goodness',
    // iOS only:
    excludedActivityTypes: [
      'com.apple.UIKit.activity.PostToTwitter'
    ]
  })
}

  return (
    <>
      <PageHeader
        title="Inviter"
        backButton
      />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
      >
        <MoodSelector />
        <Text style={styles.title}>
          { TITLES[currentMood] }
        </Text>
        <Image
          source={IMAGES[currentMood]}
          style={styles.image}
        />
        <View style={styles.buttonsRow}>
          <View>
            <Text style={styles.title}>{'INVITER TES CONTACTS\nPAR TEXTO OU EMAIL'}</Text>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: moodInfos.color }
              ]}
			  onPress={sahreClick}
            >
              <Feather name="mail" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

import React, {
  useCallback,
} from 'react';
import {
  Text,
  View,
} from 'react-native';

import { SharedElement } from 'react-navigation-shared-element';
import { Image } from 'react-native-expo-image-cache';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';
import MoodSelector from '../../../../Global/MoodSelector';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';
import useVisitedProfil from '../../../../../Hooks/useVisitedProfil';

export default function Moods() {
  const { currentMood } = useCurrentMood();
  const { profil } = useVisitedProfil();

  const onOpenPhoto = useCallback((photo) => {
    const { avatar, photos } = profil.moods[currentMood];
    const allPhotos = [avatar, ...photos];

    const index = allPhotos.indexOf(photo);
    NavigationHelper.navigate('MainPhotosGallerie', {
      photos: allPhotos,
      initialIndex: index,
      currentPhoto: allPhotos[index]
    });
  }, [profil, currentMood]);

  const {
    query,
    tag
  } = profil.moods[currentMood];

  return (
    <>
      <MoodSelector />
      <Text style={styles.description}>
        { query || 'AUCUNE RECHERCHE'}
      </Text>
      { tag && <Text style={styles.tag}>{`#${tag}`}</Text> }
      { !!profil.moods[currentMood].ad && (
        <TouchableOpacity
          onPress={() => NavigationHelper.navigate('MainTabsEditAd')}
          style={styles.descriptionContainer}
        >
          <Text style={styles.descriptionText}>{profil.moods[currentMood].ad}</Text>
        </TouchableOpacity>
      )}
      <View style={styles.imagesContainer}>
        { profil.moods[currentMood].photos.map(p => (
          <TouchableOpacity key={p} onPress={() => onOpenPhoto(p)}>
            <SharedElement key={p} id={p}>
              <Image
                uri={p}
                style={styles.image}
              />
            </SharedElement>
          </TouchableOpacity>
        ))
      }
      </View>
    </>
  );
}

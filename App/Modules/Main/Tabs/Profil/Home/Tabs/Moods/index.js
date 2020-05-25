import React, {
  useCallback, useMemo,
} from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import { SharedElement } from 'react-navigation-shared-element';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ActionSheet from 'react-native-action-sheet';

import styles from './styles';
import MoodSelector from '../../../../../../Global/MoodSelector';
import ImageHolder from './ImageHolder';
import useLogguedUser from '../../../../../../../Hooks/useLogguedUser';
import useCurrentMood from '../../../../../../../Hooks/useCurrentMood';
import NavigationHelper from '../../../../../../../Helpers/NavigationHelper';
import useModal from '../../../../../../../Hooks/useModal';

export default function Moods() {
  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser, removePhoto } = useLogguedUser();
  const { openModal: openQueryModal } = useModal('querySelector');
  const { openModal: openTagModal } = useModal('tagSelector');

  const onOpenPhoto = useCallback((photo) => {
    const { photos } = logguedUser.moods[currentMood];

    const index = photos.indexOf(photo);
    NavigationHelper.navigate('MainPhotosGallerie', {
      photos,
      initialIndex: index,
      currentPhoto: photos[index]
    });
  }, [logguedUser, currentMood]);

  const onLongTap = useCallback((photo) => {
    ActionSheet.showActionSheetWithOptions({
      title: 'Que voulez vous faire ?',
      options: ['Voire la phoho', 'Supprimer la photo', 'Annuler'],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 2,
      tintColor: moodInfos.color
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        onOpenPhoto(photo);
      } else if (buttonIndex === 1) {
        removePhoto(photo, currentMood);
      }
    });
  }, [onOpenPhoto, removePhoto, moodInfos, currentMood]);

  const {
    query,
    tag,
    photos
  } = useMemo(() => logguedUser.moods[currentMood], [currentMood, logguedUser.moods]);

  return (
    <>
      <MoodSelector />
      <TouchableOpacity
        onPress={() => NavigationHelper.navigate('MainTabsEditAd')}
        style={styles.descriptionContainer}
      >
        <Text style={styles.descriptionText}>{logguedUser.moods[currentMood].description || 'Entrez une description'}</Text>
      </TouchableOpacity>
      <View style={styles.imagesContainer}>
        { photos.map(p => (
          <TouchableOpacity key={p} onLongPress={() => onLongTap(p)} onPress={() => onOpenPhoto(p)}>
            <SharedElement key={p} id={p}>
              <Image
                uri={p}
                style={styles.image}
              />
            </SharedElement>
          </TouchableOpacity>
        ))
      }
        <ImageHolder
          containerStyle={styles.imageHolderContainer}
        />
      </View>
    </>
  );
}

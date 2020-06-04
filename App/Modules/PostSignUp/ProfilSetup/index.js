import React, { useMemo } from 'react';
import {
  KeyboardAvoidingView, SafeAreaView, Text, ImageBackground, View, Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './styles';
import { verticalScale } from '../../../Helpers/ScaleHelper';
import AuthentificationButton from '../../Global/AuthentificationButton';
import useCurrentMood from '../../../Hooks/useCurrentMood';
import useModal from '../../../Hooks/useModal';
import PhotoUploadButton from '../../Global/PhotoUploadButton';
import useLogguedUser from '../../../Hooks/useLogguedUser';
import CircularProgress from '../../Global/CircularProgress';
import NavigationHelper from '../../../Helpers/NavigationHelper';

export default function PostSignUpProfilSetup() {
  const { moodInfos, currentMood } = useCurrentMood();
  const { logguedUser, uploadAvatar } = useLogguedUser();
  const { openModal: openMoodModal } = useModal('moodSelector');
  const { openModal: openQueryModal } = useModal('querySelector');
  const { openModal: openTagModal } = useModal('tagSelector');

  const buttonIsDisabled = useMemo(() => false, []);

  async function onMedia(media) {
    try {
      await uploadAvatar(media);
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de mettre à jour l\'avatar');
    }
  }

  function onSubmit() {
    if (!currentMood) {
      Alert.alert('Erreur', 'Vous n\'avez pas défini de mood');
    } else if (!logguedUser.moods.PRO.avatar) {
      Alert.alert('Erreur', 'Vous n\'avez pas choisi de photo de profil');
    } else {
      NavigationHelper.navigate('PostSignUpQuizzIntro');
    }
  }

  const imageSource = useMemo(() => {
    if (logguedUser.moods.PRO.avatar) {
      return { uri: logguedUser.moods.PRO.avatar };
    }

    return null;
  }, [logguedUser]);

  const { query, tag } = useMemo(() => {
    if (currentMood) {
      return logguedUser.moods[currentMood];
    }

    return { query: null, tag: null };
  }, [logguedUser, currentMood]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <PhotoUploadButton
        onMedia={onMedia}
        renderUpload={upload => (
          <ImageBackground source={imageSource} style={styles.avatarContainer}>
            <SafeAreaView style={styles.header}>
              <Feather
                name="x-circle"
                size={verticalScale(22)}
                color={imageSource ? 'white' : 'black'}
                onPress={() => upload.cancel()}
              />
            </SafeAreaView>
            <View style={styles.progressContainer}>
              <CircularProgress
                containerStyle={styles.circularProgress}
                size={verticalScale(40)}
              />
            </View>
          </ImageBackground>
        )}
      >
        <ImageBackground source={imageSource} style={styles.avatarContainer}>
          <SafeAreaView style={styles.header}>
            <Feather
              name="instagram"
              size={verticalScale(22)}
              color={imageSource ? 'white' : 'black'}
            />
          </SafeAreaView>
          { !imageSource && <Text style={styles.addPhotoText}>Ajoutes une photo</Text> }
        </ImageBackground>
      </PhotoUploadButton>
      <View style={styles.scrollViewContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.scrollViewInner}>
            <View style={styles.section}>
              <Text style={styles.sectionTitleText}>CHOISIS UN DES 4 MOODS POUR DEMARRER</Text>
              <TouchableOpacity style={styles.button} onPress={() => openMoodModal({ moods: ['PRO', 'LOVE', 'SOCIAL', 'PERSO'] })}>
                <Text style={[styles.buttonText, moodInfos && { color: moodInfos.color }]}>{ moodInfos ? `MOOD ${moodInfos.title}` : 'Cliques ici' }</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitleText}>CHOISIS UNE DES RECHERCHES POSSIBLES</Text>
              <TouchableOpacity style={styles.button} onPress={openQueryModal}>
                <Text style={[styles.buttonText, moodInfos && { color: moodInfos.color }]}>{query || 'Cliques ici' }</Text>
              </TouchableOpacity>
            </View>
            { query && (
              <View style={styles.section}>
                <Text style={styles.sectionTitleText}>CHOISIS UN HASTAG# POUR PRECISER LA RECHERCHE</Text>
                <TouchableOpacity style={styles.button} onPress={openTagModal}>
                  <Text style={[styles.buttonText, moodInfos && { color: moodInfos.color }]}>{ tag ? `#${tag}` : 'Cliques ici' }</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
        <LinearGradient
          style={styles.footer}
          colors={['#ffffff00', 'white']}
          start={[0, 0]}
          end={[0, 1]}
        >
          <AuthentificationButton
            text="Commencer le test"
            disabled={buttonIsDisabled}
            containerStyle={styles.nextButton}
            onPress={onSubmit}
          />
          <SafeAreaView />
        </LinearGradient>
      </View>
    </KeyboardAvoidingView>
  );
}

PostSignUpProfilSetup.propTypes = {

};
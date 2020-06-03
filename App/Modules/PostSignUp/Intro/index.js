import React, { useMemo, useCallback } from 'react';
import {
  Text, View, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import styles from './styles';
import colors from '../../../Assets/css';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import MoodSelector from '../../Global/MoodSelector';
import useCurrentMood from '../../../Hooks/useCurrentMood';
import HeaderAvatarButton from '../../Main/Tabs/Profil/Home/HeaderAvatarButton';
import useLogguedUser from '../../../Hooks/useLogguedUser';

export default function PostSignUpIntro() {
  const { logguedUser, uploadAvatar } = useLogguedUser();
  const { currentMood, moodInfos } = useCurrentMood();
  //const startUploadAvatar = null;
  const startUploadAvatar = useCallback(async (media) => {
    try {
      await uploadAvatar(media, currentMood);
    } catch (err) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour de votre avatar');
    }
  }, [uploadAvatar, currentMood]);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.uploadPhotoPart}>
          <HeaderAvatarButton onMedia={startUploadAvatar} iconName="instagram"/>
        </View>
        <View style={styles.uploadPhotoCenterPart}>
          <TouchableOpacity
            style={styles.textMood}
            onPress={() => startUploadAvatar()}
          >
            <Text style={styles.textPhoto}>
              AJOUTE UNE PHOTO
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
        <TouchableOpacity
             onPress={() => NavigationHelper.navigate('MainNavigator')}
        >
          <Text style={styles.textMood}>
            CHOISIS UN DES 4 MOODS POUR DEMARRER
          </Text>
        </TouchableOpacity>
        <MoodSelector />
        <LinearGradient colors={['#E4C56D', '#DA407D', '#D6266E']}
                        style={styles.linearGradient}
                        start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
          <Text style={styles.buttonTextGradient} onPress={() => NavigationHelper.navigate('PostSignUpQuizz')}> FAITES LE TEST MAINTENANT </Text>
        </LinearGradient>
      </ScrollView>
    </>
  );
}

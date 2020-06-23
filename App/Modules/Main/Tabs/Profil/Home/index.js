import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert, KeyboardAvoidingView, Text, View,
} from 'react-native';
import Styles from './styles';
import moment from 'moment';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import useLogguedUser from '../../../../../Hooks/useLogguedUser';
import Profile, { ActionButton } from '../../../../Global/Profile';
import HeaderAvatarButton from './HeaderAvatarButton';
import {
  Personnality,
  Moods,
  Skills
} from './Tabs';
import useGoodFeelings from '../../../../../Hooks/useGoodFeelings';
import { useViews } from '../../../../../Hooks/useViews';
import Tabs from '../../../../Global/Profile/Tabs';
import ImageButton from '../../../../Global/ImageButton';
import useCompatibilityRequests from '../../../../../Hooks/useCompatibilityRequests';
const IMAGE_SETTING = require('../../../../../../assets/icons/menu_setting.png');
const TAB_SCENES = [
  { title: 'personnalité', key: 'personnality', View: Personnality },
  { title: 'description', key: 'moods', View: Moods },
];
export default function MainTabsProfilHome() {
  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser, uploadAvatar } = useLogguedUser();
  const { fetchAll: fetchAllGoodFeelings } = useGoodFeelings();
  const { fetchAll: fetchAllViews } = useViews();
  const { fetchAll: fetchAllCompatibilityRequests } = useCompatibilityRequests();
  const { avatar } = logguedUser.moods[currentMood];
  const imageSource = avatar || logguedUser.avatar;

  const startUploadAvatar = useCallback(async (media) => {
    try {
      await uploadAvatar(media, currentMood);
    } catch (err) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour de votre avatar');
    }
  }, [uploadAvatar, currentMood]);

  const fetchAll = useCallback(async () => {
    try {
      await fetchAllViews();
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de récupérer les vues!');
    }

    try {
      await fetchAllGoodFeelings();
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de récupérer les good feelings!');
    }

    try {
      await fetchAllCompatibilityRequests();
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de récupérer les demandes de compatibilitées!');
    }
  }, [fetchAllCompatibilityRequests, fetchAllGoodFeelings, fetchAllViews]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <View style={Styles.topHeaderProfile} >
        <Profile
          imageSource={imageSource}
          firstName={logguedUser.firstName}
          city={logguedUser.city ? logguedUser.city.toUpperCase() : 'MONTPELLIERS'}
          age={moment().diff(moment.unix(logguedUser.birthday), 'years')}
          personnality={logguedUser.personnalities.main}
          subPersonnality="Personnalité compétitive"
          HeaderTopLeftComponent={(
            <HeaderAvatarButton onMedia={startUploadAvatar} iconName="instagram"/>
          )}
          HeaderTopRightComponent={(
            <ImageButton
              imageSource={IMAGE_SETTING}
              imageStyle={Styles.iconStyle}
              onPress={() => NavigationHelper.navigate('MainGlobalSettings')}
            />
          )}
		      rightColumnActions={[
              <ActionButton
                onPress={() => NavigationHelper.navigate('MainTabsProfilSearch')}
                text="RECHERCHE"
                iconName="search"
              />,
              <ActionButton
                onPress={() => NavigationHelper.navigate('MainTabsCompatibility')}
                text="COMPATBILITER"
                iconName="refresh-cw"
              />,
              <ActionButton
                onPress={() => NavigationHelper.navigate('MainTabsProfilInvite')}
                text="INVITE"
                iconName="user-plus"
              />
           ]}
          TabComponent={(
            <Tabs
              scenes={TAB_SCENES}
            />
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

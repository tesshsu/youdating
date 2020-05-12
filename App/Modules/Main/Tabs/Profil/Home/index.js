import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert, KeyboardAvoidingView, View,
} from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';

import moment from 'moment';
import { verticalScale, scale } from '../../../../../Helpers/ScaleHelper';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import useLogguedUser from '../../../../../Hooks/useLogguedUser';
import Profile, { ActionButton } from '../../../../Global/Profile';
import HeaderAvatarButton from './HeaderAvatarButton';
import StickyAvatarButton from './StickyAvatarButton';
import {
  Moods,
  Personnality,
  Skills,
  Stats
} from './Tabs';
import useGoodFeelings from '../../../../../Hooks/useGoodFeelings';
import { useViews } from '../../../../../Hooks/useViews';
import Tabs from '../../../../Global/Profile/Tabs';
import DropDown from '../../../../Global/DropDown';
import useCompatibilityRequests from '../../../../../Hooks/useCompatibilityRequests';

const TAB_SCENES = [
  { title: 'personnalité', key: 'personnality', View: Personnality },
  { title: 'description', key: 'skills', View: Skills },
];

export default function MainTabsProfilHome() {
  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser, uploadAvatar } = useLogguedUser();
  const { fetchAll: fetchAllGoodFeelings } = useGoodFeelings();
  const { fetchAll: fetchAllViews } = useViews();
  const { fetchAll: fetchAllCompatibilityRequests } = useCompatibilityRequests();
  const [actionsDropDownToggled, setActionsDropDownToggled] = useState(false);


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
      behavior="position"
    >
      <View style={{ height: '100%', position: 'relative' }}>
        <Profile
          imageSource={imageSource}
          firstName={logguedUser.firstName}
          city={logguedUser.city ? logguedUser.city.toUpperCase() : 'MONTPELLIERS'}
          age={moment().diff(moment.unix(logguedUser.birthday), 'years')}
          personnality={logguedUser.personnalities.main}
          subPersonnality="Personnalité compétitive"
          HeaderTopLeftComponent={(
            <HeaderAvatarButton onMedia={startUploadAvatar} />
          )}
          HeaderTopRightComponent={(
            <Feather
              name="more-vertical"
              color={moodInfos.color}
              size={28}
              onPress={() => NavigationHelper.navigate('MainGlobalSettings')}
            />
          )}
          leftColumnActions={[
            <ActionButton
              key="a"
              primary
              onPress={() => NavigationHelper.navigate('MainTabsProfilGoodFeelings')}
              text="Good feeling"
              iconName="thumbs-up"
            />,
            <ActionButton
              key="b"
              primary
              onPress={() => NavigationHelper.navigate('MainTabsProfilViews')}
              text="Vues"
              iconName="eye"
            />,
            <ActionButton
              key="c"
              primary
              onPress={() => NavigationHelper.navigate('MainTabsProfilAttractions')}
              text="Attractions"
              IconProvider={FontAwesome5}
              iconName="magnet"
              iconOffset={{
                x: scale(1),
                y: verticalScale(3)
              }}
            />
          ]}
          rightColumnActions={[
            <DropDown
              key="a"
              childHeight={verticalScale(10)}
              isToggled={actionsDropDownToggled}
            >
              <ActionButton
                onPress={() => NavigationHelper.navigate('MainTabsProfilSearch')}
                text="Recherche"
                iconName="search"
              />
              <ActionButton
                onPress={() => NavigationHelper.navigate('MainTabsProfilInvite')}
                text="Inviter"
                iconName="user-plus"
                iconOffset={{
                  x: scale(2)
                }}
              />
              <ActionButton
                onPress={() => NavigationHelper.navigate('MainMoodSettings')}
                text="Réglages"
                IconProvider={FontAwesome5}
                iconName="sliders-h"
                iconOffset={{
                  y: verticalScale(2)
                }}
              />
            </DropDown>,
            <ActionButton
              key="b"
              onPress={() => setActionsDropDownToggled(!actionsDropDownToggled)}
              text="Actions"
              IconProvider={FontAwesome5}
              iconName={actionsDropDownToggled ? 'minus' : 'plus'}
              iconOffset={{
                x: scale(1),
                y: verticalScale(3)
              }}
            />
          ]}
          StickyAvatarImageComponent={(
            <StickyAvatarButton
              imageSource={imageSource}
              onMedia={startUploadAvatar}
            />
          )}
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

import React, { useEffect, useCallback, useMemo } from 'react';
import {
  KeyboardAvoidingView, View
} from 'react-native';

import moment from 'moment';
import { Image } from 'react-native-expo-image-cache';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import useCurrentMood from '../../../Hooks/useCurrentMood';
import Profile, { ActionButton } from '../../Global/Profile';
import useVisitedProfil from '../../../Hooks/useVisitedProfil';
import useLogguedUser from '../../../Hooks/useLogguedUser';
import HeaderAvatarButton from './../Tabs/Profil/Home/HeaderAvatarButton';
import styles from './styles';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import { verticalScale, scale } from '../../../Helpers/ScaleHelper';
import { useViews } from '../../../Hooks/useViews';
import useGoodFeelings from '../../../Hooks/useGoodFeelings';
import Badge from '../../Global/Badge';
import {
  Moods,
  Personnality,
  Stats,
  Skills
} from './tabs';
import Tabs from '../../Global/Profile/Tabs';
import useConversation from '../../../Hooks/useConversations';

const SCENES = [
  { title: 'personnality', key: 'moods', View: Personnality },
  { title: 'description', key: 'skills', View: Skills },
];

const FULL_ACCESS_SCENES = [
  { title: 'moods', key: 'moods', View: Moods },
  { title: 'personnalité', key: 'personnality', View: Personnality },
  { title: 'statistiques', key: 'stats', View: Stats },
  { title: 'description', key: 'skills', View: Skills },
];

export default function MainTabsProfilVisitedProfil() {
  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser, uploadAvatar } = useLogguedUser();
  const { sent: sentGoodFeelings, sendGoodFeeling } = useGoodFeelings();
  const { profil, gotFullAccess } = useVisitedProfil();
  const { createView, sent } = useViews();
  const { startConversation } = useConversation();
  const startUploadAvatar = useCallback(async (media) => {
    try {
      await uploadAvatar(media, currentMood);
    } catch (err) {
      Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour de votre avatar');
    }
  }, [uploadAvatar, currentMood]);

  const viewProfil = useCallback(async () => {
    const view = sent.find(s => s.target.id === profil.id);
    if (!view) {
      try {
        await createView(profil.id, currentMood);
      } catch (err) {
        throw new Error('Impossible de créer la vue');
      }
    }
  }, [createView, currentMood, profil, sent]);

  useEffect(() => {
    viewProfil();
  }, [currentMood, viewProfil]);

  const sendedGoodFeeling = useMemo(
    () => sentGoodFeelings.some(g => g.target.id === profil.id),
    [profil, sentGoodFeelings]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior="position"
    >
      <View style={styles.topHeaderProfile} >
        <Profile
          imageSource={profil.moods[currentMood].avatar}
          firstName={profil.firstName}
          age={moment().diff(moment.unix(profil.birthday), 'years')}
          city={profil.city ? profil.city.toUpperCase() : 'PARIS'}
          personnality={profil.personnalities.main}
          subPersonnality="Personnalité compétitive"
          HeaderTopLeftComponent={(
            <View style={styles.backButtonContainer}>
              <Feather
                name="chevron-left"
                color={moodInfos.color}
                size={verticalScale(25)}
                onPress={() => NavigationHelper.back()}
              />
            </View>
          )}
          HeaderTopRightComponent={<View width={scale(38)} />}
          leftColumnActions={[]}
          rightColumnActions={[
            <Badge
              key="messages"
              type="icon"
              iconName="check"
              disabled
            >
              <ActionButton
                primary
                text={gotFullAccess ? 'Messages' : 'Opportunité'}
                iconName="comments"
                IconProvider={FontAwesome5}
                onPress={() => startConversation(currentMood, profil)}
              />
            </Badge>,
            <Badge
              key="good-feeling"
              type="icon"
              iconName="check"
              disabled={!sendedGoodFeeling}
            >
              <ActionButton
                primary
                text="Good feeling"
                iconName="thumbs-up"
                onPress={() => sendGoodFeeling(profil)}
              />
            </Badge>
          ]}
          StickyAvatarImageComponent={(
            <Image
              uri={profil.moods[currentMood].avatar}
              style={[
                styles.avatar,
                {
                  borderColor: moodInfos.color
                }
              ]}
            />
          )}
          TabComponent={(
            <Tabs
              key={gotFullAccess ? 'FULL' : 'RESTRICTED'}
              scenes={gotFullAccess ? FULL_ACCESS_SCENES : SCENES}
            />
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

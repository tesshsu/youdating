import React, { useState, useEffect, useMemo } from 'react';
import {
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDebouncedCallback } from 'use-debounce';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles';
import PageHeader from '../../Global/PageHeader';
import SettingsCard from '../../Global/SettingsCard';
import SettingSwitch from '../../Global/SettingSwitch';
import useLogguedUser from '../../../Hooks/useLogguedUser';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import { MOODS } from '../../../GlobalConfig';

export default function GlobalSettings() {
  const {
    isAuthentificated,
    logguedUser,
    signOut,
    updateGlobalSettings,
    updateMoodVisibility,
    updateSharePosition
  } = useLogguedUser();
  const [settings, setSettings] = useState(logguedUser.settings || {});

  useEffect(() => {
    if (!isAuthentificated) {
      NavigationHelper.navigate('AuthentificationNavigator');
    }
  }, [isAuthentificated]);

  async function onSignOut() {
    await signOut();
  }

  const updateSettings = async () => {
    try {
      await updateGlobalSettings(settings);
    } catch (err) {
      Alert.alert('Erreur', 'Erreur lors de la mise à jour de vos paramètres');
    }
  };

  const [updateDebounced] = useDebouncedCallback(updateSettings, 800);

  async function updateSetting(keyName, value) {
    setSettings({ ...settings, [keyName]: value });
    updateDebounced();
  }

  async function updateSharePositionSetting(value) {
    try {
      await updateSharePosition(value);
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de mettre à jour l\'activation de la geolocalisation!');
    }
  }

  async function updateMoodVisible(mood, value) {
    try {
      await updateMoodVisibility(mood, value);
    } catch (err) {
      Alert.alert('Erreur', `Impossible de mettre à jour la visibilité du mood ${mood}`);
    }
  }

  async function updateAllMoodVisibility(value) {
    Object.keys(MOODS).forEach((mood) => {
      updateMoodVisibility(mood, value);
    });
  }

  const {
    compatibilities,
    messages,
    goodFeelings,
    opportunities,
    sharePosition,
    views
  } = settings;


  const areAllMoodVisible = useMemo(() => Object.keys(MOODS).reduce((acc, curr) => {
    if (acc === false) {
      return acc;
    }

    return logguedUser.moods[curr].visible;
  }, true), [logguedUser]);

  return (
    <>
      <PageHeader
        title="Réglages"
        backButton
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContent}
      >
        <SettingsCard
          title="LOCALISATION"
        >
          <SettingSwitch
            label="Partager ma position"
            value={sharePosition}
            onChange={() => updateSharePositionSetting(!sharePosition)}
          />
        </SettingsCard>
        <SettingsCard
          title="NOTIFICATIONS"
        >
          <SettingSwitch
            label="Vues"
            value={views}
            onChange={() => updateSetting('views', !views)}
          />
          <SettingSwitch
            label="Demandes de compatibilité"
            value={compatibilities}
            onChange={() => updateSetting('compatibilities', !compatibilities)}
          />
          <SettingSwitch
            label="Messages"
            value={messages}
            onChange={() => updateSetting('messages', !messages)}
          />
          <SettingSwitch
            label="Good Feeling"
            value={goodFeelings}
            onChange={() => updateSetting('goodFeelings', !goodFeelings)}
          />
          <SettingSwitch
            label="Opportunités"
            value={opportunities}
            onChange={() => updateSetting('opportunities', !opportunities)}
          />
        </SettingsCard>
        <SettingsCard
          title="VISIBILITÉ"
        >
          <SettingSwitch
            label="Tout les moods"
            value={areAllMoodVisible}
            onChange={() => updateAllMoodVisibility(!areAllMoodVisible)}
          />
          <SettingSwitch
            label="Mood professionel"
            value={logguedUser.moods.PRO.visible}
            onChange={() => updateMoodVisible('PRO', !logguedUser.moods.PRO.visible)}
          />
          <SettingSwitch
            label="Mood social"
            value={logguedUser.moods.SOCIAL.visible}
            onChange={() => updateMoodVisible('SOCIAL', !logguedUser.moods.SOCIAL.visible)}
          />
          <SettingSwitch
            label="Mood couple"
            value={logguedUser.moods.LOVE.visible}
            onChange={() => updateMoodVisible('LOVE', !logguedUser.moods.LOVE.visible)}
          />
          <SettingSwitch
            label="Mood personnel"
            value={logguedUser.moods.PERSO.visible}
            onChange={() => updateMoodVisible('PERSO', !logguedUser.moods.PERSO.visible)}
          />
        </SettingsCard>
		<SettingsCard
          title="NAVIGATIONS"
        >   
		    <LinearGradient colors={['#E4C56D', '#DA407D', '#D6266E']}
                            style={styles.linearGradient}
                            start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
              <Text style={styles.buttonTextGradient} onPress={() => NavigationHelper.navigate('MainTabsTchat')}> MESSAGERIE </Text>
            </LinearGradient>
			<LinearGradient colors={['#E4C56D', '#DA407D', '#D6266E']}
                            style={styles.linearGradient}
                            start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
              <Text style={styles.buttonTextGradient} onPress={() => NavigationHelper.navigate('MainTabsCompatibility')}> COMPATBILITER </Text>
            </LinearGradient>
			<LinearGradient colors={['#E4C56D', '#DA407D', '#D6266E']}
                            style={styles.linearGradient}
                            start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
              <Text style={styles.buttonTextGradient} onPress={() => NavigationHelper.navigate('MainTabsProfile')}> PROFILE </Text>
            </LinearGradient>
			<LinearGradient colors={['#E4C56D', '#DA407D', '#D6266E']}
                            style={styles.linearGradient}
                            start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
              <Text style={styles.buttonTextGradient} onPress={onSignOut}> Déconnexion </Text>
            </LinearGradient>
		</SettingsCard>
      </ScrollView>
    </>
  );
}

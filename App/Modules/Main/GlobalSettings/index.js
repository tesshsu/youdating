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
import { CheckBox } from 'react-native-elements';

export default function GlobalSettings() {
  const [isChecked, setIsChecked] = useState(true);
  const {
    isAuthentificated,
    logguedUser,
    signOut,
	checked = true,
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
        title="paramètres"
        backButton
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContent}
      >
		<SettingsCard
          title="Navigations"
        >
			 <LinearGradient colors={['#E4C56D', '#DA407D', '#D6266E']}
                            style={styles.linearGradient}
                            start={{ y: 0.0, x: 0.0 }} end={{ y: 0.0, x: 1.0 }}>
              <Text style={styles.buttonTextGradient} onPress={() => NavigationHelper.navigate('MainTabsMet')}> RENCONTRES </Text>
		    </LinearGradient>
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
		<SettingsCard
          title="confidentialite"
        >
		    <CheckBox
          center
          iconRight
          title='accepter les termes et conditions'
          checked={isChecked}
          onPress={()=>setIsChecked(!isChecked)}
			  />
		    <Text>
			    Le Site web/Application mobile développés par BEPATIENT vous permettent uniquement de vous informer et de vous accompagner dans la gestion votre état de santé/pathologie spécifique/bien être, elle n’est en aucun cas un outil de diagnostic, de consultation, d’urgence, ou autre activité de télé médecine.
			  </Text>
		</SettingsCard>
      </ScrollView>
    </>
  );
}

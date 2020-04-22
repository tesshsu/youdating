import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

//import MultiSlider from '@ptomasroos/react-native-multi-slider';
import PageHeader from '../../../../Global/PageHeader';
import styles from './styles';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import MoodSelector from '../../../../Global/MoodSelector';
import SettingsCard from '../../../../Global/SettingsCard';
import SettingSwitch from '../../../../Global/SettingSwitch';
import Slider from '../../../../Global/Slider';
import Button from '../../../../Global/Button';
import UtilsHelper from '../../../../../Helpers/UtilsHelper';
import useLogguedUser from '../../../../../Hooks/useLogguedUser';

function grabSettings(user, mood) {
  const {
    searchType,
    minAge,
    maxAge,
    maxDistance
  } = user.moods[mood];

  return {
    searchType,
    minAge,
    maxAge,
    maxDistance
  };
}

export default function MainTabsProfileSettings() {
  const { moodInfos, currentMood } = useCurrentMood();
  const { logguedUser, updateMoodSettings } = useLogguedUser();
  const [settings, setSettings] = useState(() => grabSettings(logguedUser, currentMood));
  const pristine = useMemo(() => UtilsHelper.deepEqual(settings, grabSettings(logguedUser, currentMood)),
    [settings, logguedUser, currentMood]);

  useEffect(() => {
    setSettings(grabSettings(logguedUser, currentMood));
  }, [currentMood, logguedUser]);

  function createSettingSetter(name, forcedValue) {
    return function setter(value) {
      setSettings({ ...settings, [name]: forcedValue || value });
    };
  }

  function setMinAndMaxAge([minAge, maxAge]) {
    setSettings({ ...settings, minAge, maxAge });
  }

  async function save() {
    try {
      await updateMoodSettings(currentMood, settings);
    } catch (err) {
      Alert.alert('Erreur', 'Impossible de mettre à jour les paramètres!');
    }
  }

  return (
    <>
      <PageHeader
        backButton
        inverted
        title="Réglages"
      />
      <ScrollView
        style={{ backgroundColor: moodInfos.color }}
        contentContainerStyle={styles.scrollViewContent}
      >
        <MoodSelector inverted />
        <SettingsCard
          title="TU RECHERCHES"
        >
          <SettingSwitch
            label="Homme"
            value={settings.searchType === 'MALE'}
            onChange={createSettingSetter('searchType', 'MALE')}
          />
          <SettingSwitch
            label="Femme"
            value={settings.searchType === 'FEMALE'}
            onChange={createSettingSetter('searchType', 'FEMALE')}
          />
          <SettingSwitch
            label="Les deux"
            value={settings.searchType === 'BOTH'}
            onChange={createSettingSetter('searchType', 'BOTH')}
          />
        </SettingsCard>
        <SettingsCard
          title="DISTANCE MAXIMALE"
          rightLabel={`${settings.maxDistance} KM`}
        >
          <Slider
            step={10}
            minimumValue={1}
            maximumValue={500}
            value={settings.maxDistance}
            onValueChange={createSettingSetter('maxDistance')}
          />
        </SettingsCard>
        <SettingsCard
          title="TRANCHE D'AGE"
          rightLabel={`${settings.minAge}ans - ${settings.maxAge}ans`}
        >
          <MultiSlider
            min={18}
            max={100}
            step={1}
            selectedStyle={{ backgroundColor: moodInfos.color }}
            values={[settings.minAge, settings.maxAge]}
            onValuesChangeFinish={setMinAndMaxAge}
          />
        </SettingsCard>
        <Button text="Valider" disabled={pristine} onPress={save} />
      </ScrollView>
    </>
  );
}

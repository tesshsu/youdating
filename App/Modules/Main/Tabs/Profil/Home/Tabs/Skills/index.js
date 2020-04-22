import React, { useState, useCallback } from 'react';
import { View, Text, Alert } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useDebouncedCallback } from 'use-debounce';

import styles from './styles';
import MoodSelector from '../../../../../../Global/MoodSelector';
import SettingsCard from '../../../../../../Global/SettingsCard';
import SettingSwitch from '../../../../../../Global/SettingSwitch';
import MoodText from '../../../../../../Global/MoodText';
import useCurrentMood from '../../../../../../../Hooks/useCurrentMood';
import { verticalScale } from '../../../../../../../Helpers/ScaleHelper';
import useLogguedUser from '../../../../../../../Hooks/useLogguedUser';
import CustomSlider from '../../../../../../Global/CustomSlider';
import NavigationHelper from '../../../../../../../Helpers/NavigationHelper';

const ASSETS = [
  'dynamique',
  'polyvalent',
  'audacieux',
  'créatif',
  'philosophe',
  'ponctuel',
  'souriant',
  'rigoureux',
  'logique',
  'sensible',
  'respectueux',
  'concentré',
  'serviable',
  'généreux',
  'enthousiaste',
  'fidèle',
  'drôle',
  'reservé',
  'cutivé',
  'pétillant'
];

const LIFE_STYLES = [
  'dandy/classe',
  'geek',
  'gothique',
  'street',
  'hipster',
  'sportif',
  'classique',
  'hippie',
  'bcbg',
  'bobo',
  'rockeur',
  'electro',
  'décontracté',
  'teufeur'
];

const ASSETS_CHUNKS = ASSETS.reduce((acc, curr) => {
  if (acc[acc.length - 1].length === ASSETS.length / 4) {
    acc.push([curr]);
  } else {
    acc[acc.length - 1].push(curr);
  }

  return acc;
}, [[]]);

const LIFE_STYLES_CHUNKS = LIFE_STYLES.reduce((acc, curr) => {
  if (acc[acc.length - 1].length === LIFE_STYLES.length / 2) {
    acc.push([curr]);
  } else {
    acc[acc.length - 1].push(curr);
  }

  return acc;
}, [[]]);

export default function Skills() {
  const { moodInfos, currentMood } = useCurrentMood();
  const { logguedUser, updateSkills } = useLogguedUser();
  const [skills, setSkills] = useState(() => logguedUser.skills);
  const [debouncedUpdate] = useDebouncedCallback(
    async () => {
      try {
        await updateSkills(skills);
      } catch (err) {
        Alert.alert('Erreur', 'Une erreur est survenue lors de la mise à jour des skills');
      }
    },
    1000
  );

  const setField = useCallback((keyName, value) => {
    if (!skills[keyName] || (skills[keyName] !== value)) {
      skills[keyName] = value;

      setSkills({ ...skills });
      debouncedUpdate();
    }
  }, [debouncedUpdate, skills]);

  function toggleAsset(asset) {
    const { assets } = skills;
    const index = assets.indexOf(asset);

    if (index > -1) {
      assets.splice(index, 1);
    } else {
      if (assets.length === 5) {
        assets.splice(0, 1);
      }

      assets.push(asset);
    }

    setSkills({ ...skills, assets });
    debouncedUpdate();
  }

  function toggleLifeStyle(lifeStyle) {
    const { lifeStyles } = skills;
    const index = lifeStyles.indexOf(lifeStyle);

    if (index > -1) {
      lifeStyles.splice(index, 1);
    } else {
      if (lifeStyles.length >= 5) {
        lifeStyles.splice(0, 1);
      }

      lifeStyles.push(lifeStyle);
    }

    setSkills({ ...skills, lifeStyles });
    debouncedUpdate();
  }

  return (
    <>
      <MoodSelector containerStyle={{ marginBottom: 0 }} />
      <View style={styles.section}>
        <TouchableOpacity
          onPress={() => NavigationHelper.navigate('MainTabsEditDescription')}
          style={styles.descriptionContainer}
        >
          <Text style={styles.descriptionText}>{logguedUser.moods[currentMood].description || 'Entrez une description'}</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.section, { marginTop: verticalScale(20) }]}>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabelText}>Voyages</Text>
          <CustomSlider
            containerStyle={styles.slider}
            value={skills.voyages || 0}
            step={1}
            min={0}
            max={4}
            labels={[
              { label: 'débutant', value: 1 },
              { label: 'confirmée', value: 2 },
              { label: 'expert', value: 3 },
            ]}
            onValueChange={value => setField('voyages', value)}
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabelText}>Sorties/Activités</Text>
          <CustomSlider
            containerStyle={styles.slider}
            value={skills.activities || 0}
            step={1}
            min={0}
            max={4}
            labels={[
              { label: 'rare', value: 1 },
              { label: 'occasionnel', value: 2 },
              { label: 'souvent', value: 3 },
            ]}
            onValueChange={value => setField('activities', value)}
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabelText}>Cuisine</Text>
          <CustomSlider
            containerStyle={[styles.slider, { marginBottom: verticalScale(30) }]}
            value={skills.cooking || 0}
            step={1}
            min={0}
            max={4}
            labels={[
              { label: 'basique', value: 1 },
              { label: 'bonne', value: 2 },
              { label: 'excellente', value: 3 },
            ]}
            onValueChange={value => setField('cooking', value)}
          />
        </View>
      </View>
      <View style={styles.section}>
        <MoodText style={styles.title}>{`Mes atouts ${skills.assets.length}/5`}</MoodText>
        <View style={styles.assetsRow}>
          { ASSETS_CHUNKS.map((assets, i) => (
            <View key={i.toString()} style={styles.assetsColumn}>
              { assets.map((a, i2) => {
                const TextProvider = skills.assets.includes(a) ? MoodText : Text;
                return (
                  <TouchableOpacity key={i2.toString()} onPress={() => toggleAsset(a)}>
                    <TextProvider style={styles.assetText}>{ a }</TextProvider>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <MoodText style={styles.title}>Métier</MoodText>
        <TouchableOpacity
          onPress={() => NavigationHelper.navigate('MainTabsEditJob')}
          style={styles.descriptionContainer}
        >
          <Text style={styles.descriptionText}>{logguedUser.job || 'Non renseigné'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <MoodText style={styles.title}>Mes mensurations</MoodText>
        <SettingsCard>
          <SettingSwitch
            label="athlétique"
            value={skills.bodyType === 'athlétique'}
            onChange={() => setField('bodyType', 'athlétique')}
          />
          <SettingSwitch
            label="mince"
            value={skills.bodyType === 'mince'}
            onChange={() => setField('bodyType', 'mince')}
          />
          <SettingSwitch
            label="musclé"
            value={skills.bodyType === 'musclé'}
            onChange={() => setField('bodyType', 'musclé')}
          />
          <SettingSwitch
            label="enrobé"
            value={skills.bodyType === 'enrobé'}
            onChange={() => setField('bodyType', 'enrobé')}
          />
        </SettingsCard>
      </View>
      <View style={styles.section}>
        <MoodText style={styles.title}>Couleur des yeux</MoodText>
        <SettingsCard>
          <SettingSwitch
            label="noirs"
            value={skills.eyesColor === 'noirs'}
            onChange={() => setField('eyesColor', 'noirs')}
          />
          <SettingSwitch
            label="bleus"
            value={skills.eyesColor === 'bleus'}
            onChange={() => setField('eyesColor', 'bleus')}
          />
          <SettingSwitch
            label="marrons"
            value={skills.eyesColor === 'marrons'}
            onChange={() => setField('eyesColor', 'marrons')}
          />
          <SettingSwitch
            label="verts"
            value={skills.eyesColor === 'verts'}
            onChange={() => setField('eyesColor', 'verts')}
          />
        </SettingsCard>
      </View>
      <View style={styles.section}>
        <MoodText style={styles.title}>Couleur des cheveux</MoodText>
        <SettingsCard>
          <SettingSwitch
            label="chatains"
            value={skills.hairColor === 'chatains'}
            onChange={() => setField('hairColor', 'chatains')}
          />
          <SettingSwitch
            label="poivre et sel"
            value={skills.hairColor === 'poivre-et-sel'}
            onChange={() => setField('hairColor', 'poivre-et-sel')}
          />
          <SettingSwitch
            label="blonds"
            value={skills.hairColor === 'blonds'}
            onChange={() => setField('hairColor', 'blonds')}
          />
          <SettingSwitch
            label="noirs"
            value={skills.hairColor === 'noirs'}
            onChange={() => setField('hairColor', 'noirs')}
          />
          <SettingSwitch
            label="roux"
            value={skills.hairColor === 'roux'}
            onChange={() => setField('hairColor', 'roux')}
          />
          <SettingSwitch
            label="blancs"
            value={skills.hairColor === 'blancs'}
            onChange={() => setField('hairColor', 'blancs')}
          />
          <SettingSwitch
            label="bruns"
            value={skills.hairColor === 'bruns'}
            onChange={() => setField('eyesColor', 'bruns')}
          />
        </SettingsCard>
      </View>
      <View style={styles.section}>
        <MoodText style={styles.title}>Longeur des cheveux</MoodText>
        <SettingsCard>
          <SettingSwitch
            label="longs"
            value={skills.hair === 'longs'}
            onChange={() => setField('hair', 'longs')}
          />
          <SettingSwitch
            label="mi-longs"
            value={skills.hair === 'mi-longs'}
            onChange={() => setField('hair', 'mi-longs')}
          />
          <SettingSwitch
            label="courts"
            value={skills.hair === 'courts'}
            onChange={() => setField('hair', 'courts')}
          />
          <SettingSwitch
            label="rasés"
            value={skills.hair === 'rasés'}
            onChange={() => setField('hair', 'rasés')}
          />
        </SettingsCard>
      </View>
      <View style={styles.section}>
        <MoodText style={styles.title}>{`Style de vie ${skills.lifeStyles.length}/2`}</MoodText>
        <View style={styles.assetsRow}>
          { LIFE_STYLES_CHUNKS.map((chunk, i) => (
            <View key={i.toString()}>
              { chunk.map((ls, i2) => {
                const isSelected = skills.lifeStyles.includes(ls);
                return (
                  <TouchableOpacity
                    key={i2.toString()}
                    style={styles.lifeStyleButton}
                    onPress={() => toggleLifeStyle(ls)}
                  >
                    <Feather
                      name={isSelected ? 'check-circle' : 'circle'}
                      color={isSelected ? moodInfos.color : '#BBBABA'}
                      size={verticalScale(18)}
                    />
                    <Text style={styles.lifeStyleText}>{ ls }</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    </>
  );
}

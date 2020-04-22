import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import MoodSelector from '../../../../Global/MoodSelector';
import SettingsCard from '../../../../Global/SettingsCard';
import SettingSwitch from '../../../../Global/SettingSwitch';
import MoodText from '../../../../Global/MoodText';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import { verticalScale } from '../../../../../Helpers/ScaleHelper';
import CustomSlider from '../../../../Global/CustomSlider';
import useVisitedProfil from '../../../../../Hooks/useVisitedProfil';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';

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
  const { profil } = useVisitedProfil();
  const [skills] = useState(() => profil.skills);

  return (
    <>
      <MoodSelector containerStyle={{ marginBottom: 0 }} />
      <View style={styles.section}>
        <TouchableOpacity
          disabled
          onPress={() => NavigationHelper.navigate('MainTabsEditDescription')}
          style={styles.descriptionContainer}
        >
          <Text style={styles.descriptionText}>{profil.moods[currentMood].description || `${profil.firstName} n'a pas rentré de description`}</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.section, { marginTop: verticalScale(10) }]}>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabelText}>Voyages</Text>
          <CustomSlider
            disabled
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
            onValueChange={() => {}}
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabelText}>Sorties/Activités</Text>
          <CustomSlider
            disabled
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
            onValueChange={() => {}}
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabelText}>Cuisine</Text>
          <CustomSlider
            disabled
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
            onValueChange={() => {}}
          />
        </View>
      </View>
      <View style={styles.section}>
        <MoodText style={styles.title}>Mes atouts</MoodText>
        <View style={styles.assetsRow}>
          { ASSETS_CHUNKS.map((assets, i) => (
            <View key={i.toString()} style={styles.assetsColumn}>
              { assets.map((a, i2) => {
                const TextProvider = skills.assets.includes(a) ? MoodText : Text;
                return (
                  <TouchableOpacity key={i2.toString()} disabled>
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
          disabled
          onPress={() => NavigationHelper.navigate('MainTabsEditJob')}
          style={styles.descriptionContainer}
        >
          <Text style={styles.descriptionText}>{profil.job || 'Non renseigné'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <MoodText style={styles.title}>Mes mensurations</MoodText>
        <SettingsCard>
          <SettingSwitch
            label="athlétique"
            disabled
            value={skills.bodyType === 'athlétique'}
          />
          <SettingSwitch
            label="mince"
            disabled
            value={skills.bodyType === 'mince'}
          />
          <SettingSwitch
            label="musclé"
            disabled
            value={skills.bodyType === 'musclé'}
          />
          <SettingSwitch
            label="enrobé"
            disabled
            value={skills.bodyType === 'enrobé'}
          />
        </SettingsCard>
      </View>
      <View style={styles.section}>
        <MoodText style={styles.title}>Couleur des yeux</MoodText>
        <SettingsCard>
          <SettingSwitch
            label="noirs"
            disabled
            value={skills.eyesColor === 'noirs'}
          />
          <SettingSwitch
            label="bleus"
            disabled
            value={skills.eyesColor === 'bleus'}
          />
          <SettingSwitch
            label="marrons"
            disabled
            value={skills.eyesColor === 'marrons'}
          />
          <SettingSwitch
            label="verts"
            disabled
            value={skills.eyesColor === 'verts'}
          />
        </SettingsCard>
      </View>
      <View style={styles.section}>
        <MoodText style={styles.title}>Couleur des cheveux</MoodText>
        <SettingsCard>
          <SettingSwitch
            label="chatains"
            disabled
            value={skills.hairColor === 'chatains'}
          />
          <SettingSwitch
            label="poivre et sel"
            disabled
            value={skills.hairColor === 'poivre-et-sel'}
          />
          <SettingSwitch
            label="blonds"
            disabled
            value={skills.hairColor === 'blonds'}
          />
          <SettingSwitch
            label="noirs"
            disabled
            value={skills.hairColor === 'noirs'}
          />
          <SettingSwitch
            label="roux"
            disabled
            value={skills.hairColor === 'roux'}
          />
          <SettingSwitch
            label="blancs"
            disabled
            value={skills.hairColor === 'blancs'}
          />
          <SettingSwitch
            label="bruns"
            disabled
            value={skills.hairColor === 'bruns'}
          />
        </SettingsCard>
      </View>
      <View style={styles.section}>
        <MoodText style={styles.title}>Longeur des cheveux</MoodText>
        <SettingsCard>
          <SettingSwitch
            label="longs"
            disabled
            value={skills.hair === 'longs'}
          />
          <SettingSwitch
            label="mi-longs"
            disabled
            value={skills.hair === 'mi-longs'}
          />
          <SettingSwitch
            label="courts"
            disabled
            value={skills.hair === 'courts'}
          />
          <SettingSwitch
            label="rasés"
            disabled
            value={skills.hair === 'rasés'}
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
                    disabled
                    style={styles.lifeStyleButton}
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

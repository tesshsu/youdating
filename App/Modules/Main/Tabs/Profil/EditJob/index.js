import React, { useState, useCallback } from 'react';
import {
  Alert, View, Text, ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';


import styles from './styles';
import PageHeader from '../../../../Global/PageHeader';
import { verticalScale } from '../../../../../Helpers/ScaleHelper';
import useLogguedUser from '../../../../../Hooks/useLogguedUser';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';
import CheckLine from './CheckLine';

export default function MainTabsEditJob() {
  const { logguedUser, updateJob } = useLogguedUser();
  const [isSaving, setIsSaving] = useState(false);
  const [job, setJob] = useState(() => logguedUser.job || '');

  const submit = useCallback(async () => {
    const input = job.replace(/ +/g, ' ').replace(/\n+/g, '\n').trim();

    try {
      setIsSaving(true);
      await updateJob(input);
    } catch (err) {
      Alert.alert('Erreur', 'Erreur lors de la sauvegarde de votre métier');
    } finally {
      setIsSaving(false);
      NavigationHelper.back();
    }
  }, [job, updateJob]);

  return (
    <>
      <PageHeader
        title="Mon Métier"
        rightComponent={() => {
          if (isSaving) {
            return (
              <ActivityIndicator
                size="small"
                color="white"
              />
            );
          }

          return (
            <Feather
              name="check"
              color="white"
              size={verticalScale(20)}
              onPress={submit}
            />
          );
        }}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Text style={styles.titleText}>Quel poste occupez vous ?</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre métier"
            maxLength={100}
            value={job}
            onChangeText={setJob}
          />
        </View>
        <CheckLine
          label="Sans emploi"
          checked={job === 'Sans emploi'}
          onPress={() => setJob('Sans emploi')}
        />
        <CheckLine
          label="Retraité"
          checked={job === 'Retraité'}
          onPress={() => setJob('Retraité')}
        />
        <CheckLine
          label="Non renseigné"
          checked={job === ''}
          onPress={() => setJob('')}
        />
      </ScrollView>
    </>
  );
}

import React, { useState, useCallback } from 'react';
import {
  Alert, View, Text, ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';


import styles from './styles';
import PageHeader from '../../../../Global/PageHeader';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import { verticalScale } from '../../../../../Helpers/ScaleHelper';
import useLogguedUser from '../../../../../Hooks/useLogguedUser';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';

export default function MainTabsEditDescription() {
  const { logguedUser, updateDescription } = useLogguedUser();
  const { currentMood } = useCurrentMood();
  const [isSaving, setIsSaving] = useState(false);
  const [description, setDescription] = useState(() => logguedUser.moods[currentMood].description || '');

  const submit = useCallback(async () => {
    const input = description.replace(/ +/g, ' ').replace(/\n+/g, '\n').trim();

    try {
      setIsSaving(true);
      await updateDescription(currentMood, input);
    } catch (err) {
      Alert.alert('Erreur', 'Erreur lors de la sauvegarde de votre description');
    } finally {
      setIsSaving(false);
      NavigationHelper.back();
    }
  }, [currentMood, description, updateDescription]);

  return (
    <>
      <PageHeader
        title="Ma Description"
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
        <Text style={styles.titleText}>Editer ma description</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre description"
            multiline
            maxLength={255}
            value={description}
            onChangeText={setDescription}
          />
          <Text style={styles.remainingCharactersText}>{`${description.length}/255`}</Text>
        </View>
      </ScrollView>
    </>
  );
}

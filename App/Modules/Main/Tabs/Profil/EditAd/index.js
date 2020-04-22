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

export default function MainTabsEditAd() {
  const { logguedUser, updateAd } = useLogguedUser();
  const { currentMood } = useCurrentMood();
  const [isSaving, setIsSaving] = useState(false);
  const [ad, setAd] = useState(() => logguedUser.moods[currentMood].ad || '');

  const submit = useCallback(async () => {
    const input = ad.replace(/ +/g, ' ').replace(/\n+/g, '\n').trim();

    try {
      setIsSaving(true);
      await updateAd(currentMood, input);
    } catch (err) {
      Alert.alert('Erreur', 'Erreur lors de la sauvegarde de votre annonce');
    } finally {
      setIsSaving(false);
      NavigationHelper.back();
    }
  }, [ad, currentMood, updateAd]);

  return (
    <>
      <PageHeader
        title="Mon annonce"
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
        <Text style={styles.titleText}>Editer votre annonce</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre annonce"
            multiline
            maxLength={255}
            value={ad}
            onChangeText={setAd}
          />
          <Text style={styles.remainingCharactersText}>{`${ad.length}/255`}</Text>
        </View>
      </ScrollView>
    </>
  );
}

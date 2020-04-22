import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import ActionButton from './ActionButton';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import NavigationHelper from '../../../../Helpers/NavigationHelper';
import ProfilePhotoButton from './ProfilePhotoButton';
import useLogguedUser from '../../../../Hooks/useLogguedUser';
import TabView from '../../TabView';
import Moods from './Moods';
import Personnality from './Personnality';
import Skills from './Skills';
import Stats from './Stats';

export default function MainTabsProfilHome() {
  const { moodInfos } = useCurrentMood();
  const { logguedUser } = useLogguedUser();

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <ImageBackground
          style={styles.avatar}
          height={undefined}
          source={logguedUser.avatar}
          resizeMode="cover"
          resizeMethod="resize"
        >
          <SafeAreaView style={styles.header}>
            <ProfilePhotoButton />
            <View style={styles.headerTextContainer}>
              <View
                style={[
                  styles.headerOnline,
                  { backgroundColor: moodInfos.color }
                ]}
              />
              <Text style={styles.headerText}>{'42ANS-PARIS-YOU\'S ON'}</Text>
            </View>
            <Feather
              name="more-vertical"
              color="white"
              size={28}
              onPress={() => NavigationHelper.navigate('MainTabsProfilGlobalSettings')}
            />
          </SafeAreaView>
          <View style={styles.rightButtons}>
            <ActionButton
              primary
              onPress={() => {}}
              text="Good feeling"
              iconName="thumbs-up"
            />
          </View>
          <View style={styles.profilInfos}>
            <Text style={styles.profilInfosText}>
              <Text style={styles.firstName}>{'Jessica\n'}</Text>
              <Text style={[styles.profilType, { color: moodInfos.color }]}>{'Ambitionnel\n'}</Text>
              <Text style={styles.personality}>Personnalité compétitive</Text>
            </Text>
          </View>
        </ImageBackground>
      </View>
      <TabView
        scenes={[
          { title: 'moods', key: 'moods', View: Moods },
          { title: 'personnalité', key: 'personnality', View: Personnality },
          { title: 'compétences', key: 'skills', View: Skills },
          { title: 'statistiques', key: 'stats', View: Stats },
        ]}
        renderScene={scene => (
          <ScrollView contentContainerStyle={styles.sceneWrapper}>
            { scene }
          </ScrollView>
        )}
      />
      <View style={styles.bottomSheet}>
        <View style={styles.row}>
          <Text
            style={[
              styles.rowText,
              { color: moodInfos.color }
            ]}
          >
            TUTORIEL
          </Text>
        </View>
        <View
          style={[
            styles.row,
            { borderBottomWidth: 0 }
          ]}
        >
          <Text
            style={[
              styles.rowText
            ]}
          >
            SIGNALER UN ABUS
          </Text>
        </View>
      </View>
    </View>
  );
}

MainTabsProfilHome.navigationOptions = {
  header: null
};

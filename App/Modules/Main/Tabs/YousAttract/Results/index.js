import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  FlatList
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import styles from './styles';

import MoodSelector from '../../../../Global/MoodSelector';
import ListItemSeparator from '../../../../Global/ListItemSeparator';
import PageHeader from '../../../../Global/PageHeader';
import RoundIconButton from '../../../../Global/RoundIconButton';
import { verticalScale } from '../../../../../Helpers/ScaleHelper';
import YousOn from '../../../../Global/YousOn';
import RoundButton from '../../../../Global/RoundButton';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';

const IMAGE_GIRL5 = require('../../../../../../assets/images/profile_pics/girl5.jpg');
const IMAGE_GIRL6 = require('../../../../../../assets/images/profile_pics/girl6.jpg');
const IMAGE_GIRL7 = require('../../../../../../assets/images/profile_pics/girl7.jpg');

const ITEMS = [
  { username: 'Agathe', avatar: IMAGE_GIRL5 },
  { username: 'Helena', avatar: IMAGE_GIRL6 },
  { username: 'Yaelle', avatar: IMAGE_GIRL7 },
];

export default function MainTabsYousAttractResults() {
  const { moodInfos } = useCurrentMood();

  return (
    <>
      <PageHeader
        title="Attractions"
        backButton
      />
      <MoodSelector />
      <Text style={styles.titleText}>
        {'Aujourd\'hui'}
      </Text>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={ITEMS}
        ItemSeparatorComponent={ListItemSeparator}
        keyExtractor={item => item.username}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.left}>
              <ImageBackground
                source={item.avatar}
                style={styles.imageBackground}
                imageStyle={styles.imageBackgroundImage}
              />
              <Text
                style={[
                  styles.usernameText,
                  { color: moodInfos.color }
                ]}
              >
                { item.username }
              </Text>
              <YousOn online>
                <Text style={styles.userInfosText}>
                  27ans-Miami
                </Text>
              </YousOn>
              <RoundButton
                text="consulter son profil"
                uppercase
                height={verticalScale(24)}
                borderRadius={verticalScale(5)}
                onPress={() => {}}
              />
            </View>
            <View style={styles.buttons}>
              <View style={styles.button}>
                <RoundIconButton
                  iconColor="white"
                  iconSize={verticalScale(20)}
                  IconProvider={FontAwesome5}
                  iconName="magnet"
                  backgroundColor={moodInfos.color}
                  size={verticalScale(42)}
                  onPress={() => {}}
                />
                <Text style={styles.buttonText}>Attraction</Text>
              </View>
              <View style={styles.button}>
                <RoundIconButton
                  iconColor="white"
                  iconSize={verticalScale(20)}
                  iconName="minimize-2"
                  backgroundColor={moodInfos.color}
                  size={verticalScale(42)}
                  onPress={() => {}}
                />
                <Text style={styles.buttonText}>Compatibilité</Text>
              </View>
              <View style={styles.button}>
                <RoundIconButton
                  iconColor="white"
                  iconSize={verticalScale(20)}
                  iconName="thumbs-up"
                  backgroundColor={moodInfos.color}
                  size={verticalScale(42)}
                  onPress={() => {}}
                />
                <Text style={styles.buttonText}>Good Feeling</Text>
              </View>
            </View>
            <View style={styles.right}>
              <View style={styles.rightUp}>
                <Text style={styles.distanceText}>
                  moins de 500m
                </Text>
                <Text style={styles.timeText}>Maintenant</Text>
              </View>
              <Text style={styles.citationText}>
                &quot; Besoin de travailler un peu &quot;
              </Text>
            </View>
          </View>
        )}
      />
    </>
  );
}

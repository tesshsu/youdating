import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import styles from './styles';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import NavigationHelper from '../../../../../Helpers/NavigationHelper';

const IMAGE_GIRL3 = require('../../../../../../assets/images/profile_pics/girl3.jpg');

export default function CompatibilityResult({ user }) {
  const { moodInfos } = useCurrentMood();

  if (!user) {
    return (null);
  }

  return (
    <View style={styles.compatibilityResult}>
      <Text style={styles.resultTitleText}>Résultats de mes intéractions</Text>
      <View>
        <Text
          style={[
            styles.resultText,
            { color: moodInfos.color }
          ]}
        >
          {`Excellente compatibilité ${moodInfos.titleFeminize}`}
        </Text>
        <Text style={styles.resultBodyText}>
          Profitez de cette opportunité pour réaliser de grands projets ensemble, vous avez trouvé la perle rare !!
        </Text>
      </View>
      <View style={styles.usersRow}>
        <View style={styles.userContainer}>
          <ImageBackground
            source={IMAGE_GIRL3}
            style={styles.imageBackground}
            imageStyle={styles.imageBackgroundImage}
          />
          <Text style={styles.usernameText}>MOI</Text>
        </View>
        <Text
          style={[
            styles.vsText,
            { color: moodInfos.color }
          ]}
        >
          VS
        </Text>
        <View style={styles.userContainer}>
          <ImageBackground
            source={user.avatar}
            style={styles.imageBackground}
            imageStyle={styles.imageBackgroundImage}
          />
          <Text style={styles.usernameText}>{user.username}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: moodInfos.color }
          ]}
          onPress={() => NavigationHelper.navigate('MainCompatibilityDetails', { user })}
        >
          <Text style={styles.buttonText}>
            En savoir plus sur la relation
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: moodInfos.color }
          ]}
          onPress={() => NavigationHelper.navigate('MainTchatConversation', { user })}
        >
          <Text style={styles.buttonText}>
            Envoie un message privé
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import React, { useState } from 'react';
import {
  Text,
  View,
} from 'react-native';
import styles from './styles';
import { scale } from '../../../../Helpers/ScaleHelper';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import PageHeader from '../../../Global/PageHeader';
import ImageButton from '../../../Global/ImageButton';
import MoodSelector from '../../../Global/MoodSelector';
import NavigationHelper from '../../../../Helpers/NavigationHelper';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import CompatibilitiesList from './CompatibilitiesList';
import CompatibilityResult from './CompatibilityResult';
const IMAGE_SETTING = require('../../../../../assets/icons/icon-user-grey.png');
export default function MainCompatibility() {
  const { moodInfos } = useCurrentMood();
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <PageHeader
        title="Compatibilité"
        rightComponent={() => (
          <FontAwesome5
            name="comment-alt"
            size={20}
            color="white"
            onPress={() => NavigationHelper.navigate('MainTabsTchat')}
          />
        )}
        leftComponent={() => (
          <ImageButton
            imageSource={IMAGE_SETTING}
            imageStyle={styles.iconStyle}
            onPress={() => NavigationHelper.navigate('MainTabsProfile')}
          />
        )}
      />
      <View style={styles.container}>
        <MoodSelector />
        <Text style={styles.title}>{`Mes contacts ${moodInfos.title}`}</Text>
        <CompatibilitiesList
          selectedUser={selectedUser}
          onSelected={setSelectedUser}
        />
        <CompatibilityResult
          user={selectedUser}
        />
      </View>
    </>
  );
}

MainCompatibility.navigationOptions = {
  tabBarLabel: 'Compatibilité',
  tabBarIcon: ({ tintColor }) => (
    <Feather name="refresh-cw" color={tintColor} size={scale(20)} />
  )
};

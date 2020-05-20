import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useIsFocused } from 'react-navigation-hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';
import PageHeader from '../../../Global/PageHeader';
import MoodSelector from '../../../Global/MoodSelector';
import { scale, verticalScale } from '../../../../Helpers/ScaleHelper';
import ProfilesModToggler from './ProfilesModToggler';
import UsersCarousel from './UsersCarousel';
import NavigationHelper from '../../../../Helpers/NavigationHelper';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import useLogguedUser from '../../../../Hooks/useLogguedUser';
import useModal from '../../../../Hooks/useModal';


export default function MainMet() {
  const { logguedUser } = useLogguedUser();
  const { currentMood } = useCurrentMood();
  const { openModal: openQueryModal } = useModal('querySelector');
  const { openModal: openTagModal } = useModal('tagSelector');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (currentMood === 'PERSO' && isFocused) {
      NavigationHelper.navigate('MainTabsProfile');
    }
  }, [currentMood, isFocused]);

  const {
    query,
    tag,
  } = useMemo(() => logguedUser.moods[currentMood], [currentMood, logguedUser.moods]);

  return (
    <>
      <PageHeader
        leftComponent={ProfilesModToggler}
        rightComponent={() => (
          <FontAwesome5
            name="ellipsis-v"
            size={verticalScale(19)}
            color="white"
            onPress={() => NavigationHelper.navigate('MainGlobalSettings')}
          />
        )}
        title="RENCONTRES"
      />
      <View style={styles.container}>
        <MoodSelector
          moods={['PRO', 'SOCIAL', 'LOVE']}
        />
        <UsersCarousel />
      </View>
    </>
  );
}

MainMet.navigationOptions = {
  tabBarLabel: 'Rencontres',
  tabBarIcon: ({ tintColor }) => (
    <Feather name="users" color={tintColor} size={scale(20)} />
  )
};

import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  refreshControl,
  ImageBackground,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import RoundIconButton from '../../../../Global/RoundIconButton';
import { verticalScale } from '../../../../../Helpers/ScaleHelper';
import useCurrentMood from '../../../../../Hooks/useCurrentMood';
import useLogguedUser from '../../../../../Hooks/useLogguedUser';
import Carousel from '../../../../Global/Carousel';



const IMAGE_GIRL3 = require('../../../../../../assets/images/profile_pics/girl3.jpg');
const IMAGE_GIRL4 = require('../../../../../../assets/images/profile_pics/girl4.jpg');
const IMAGE_GIRL5 = require('../../../../../../assets/images/profile_pics/girl5.jpg');
const IMAGE_GIRL6 = require('../../../../../../assets/images/profile_pics/girl6.jpg');
const IMAGE_GIRL7 = require('../../../../../../assets/images/profile_pics/girl7.jpg');
const IMAGE_GIRL8 = require('../../../../../../assets/images/profile_pics/girl8.jpg');
const IMAGE_GIRL9 = require('../../../../../../assets/images/profile_pics/girl9.jpg');
const IMAGE_MAN4 = require('../../../../../../assets/images/profile_pics/man4.jpg');

const USERS = [
  {
    id: 0,
    username: 'Yelena',
    personnality: 'diplomatist',
    avatar: IMAGE_GIRL6,
    newMessage: true
  },
  {
    id: 1,
    username: 'Sophie',
    personnality: 'leaderent',
    avatar: IMAGE_GIRL5,
    disabled: true
  },
  {
    id: 2,
    username: 'Isabelle',
    personnality: 'diplomatist',
    avatar: IMAGE_GIRL9
  },
  {
    id: 3,
    username: 'Lou',
    personnality: 'ambitionnel',
    avatar: IMAGE_GIRL7
  },
  {
    id: 4,
    username: 'Margot',
    personnality: 'leaderent',
    avatar: IMAGE_GIRL3,
    disabled: true
  },
  {
    id: 5,
    username: 'Léa',
    personnality: 'diplomatist',
    avatar: IMAGE_GIRL4
  },
  {
    id: 6,
    username: 'Léa',
    personnality: 'diplomatist',
    avatar: IMAGE_GIRL8
  },
  {
    id: 7,
    username: 'Tom',
    personnality: 'ambitionnel',
    avatar: IMAGE_MAN4
  },
];

export default function CompatibilitiesList({ selectedUser, onSelected }) {
  const [carouselIndex, setCarrouselIndex] = useState(0);
  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser } = useLogguedUser();


  const handleOnPress = useCallback((user) => {
    onSelected(user);
  }, [onSelected]);

  useEffect(() => {
    handleOnPress(null, 0);
  }, [moodInfos, handleOnPress]);

  useEffect(() => {
    setCarrouselIndex(0);
    onSelected(USERS[0]);
  }, [onSelected, moodInfos]);

  const slicedUsers = [];

  USERS.forEach((u) => {
    const lastArray = slicedUsers[slicedUsers.length - 1];

    if (!lastArray || lastArray.length === 4) {
      slicedUsers.push([u]);
    } else {
      lastArray.push(u);
    }
  });

  return (
    <View style={{ height: verticalScale(180) }}>
      <Carousel activeIndex={carouselIndex}>
        { slicedUsers.map((chunk, index) => (
          <View key={index.toString()} style={styles.usersContainer}>
            { chunk.map((item, idx) => (
              <View
                key={idx.toString()}
                disabled={item.disabled}
                style={styles.itemContainer}
                onPress={() => handleOnPress(item, index)}
              >
                <View
                  style={[
                    styles.avatarContainer,
                    selectedUser === item && { borderColor: moodInfos.color },
                  ]}
                >
                  <ImageBackground
                    style={styles.imageBackground}
                    imageStyle={styles.imageBackgroundImage}
                    source={item.avatar}
                  />
                </View>
                <Text style={styles.usernameText}>{ item.username }</Text>
                <Text
                  style={[
                    styles.personnalityText,
                    selectedUser === item && { color: moodInfos.color }
                  ]}
                >
                  { item.personnality }
                </Text>
                <RoundIconButton
                  size={verticalScale(36)}
                  backgroundColor={item.disabled ? '#BEBFC0' : moodInfos.color}
                  IconProvider={Feather}
                  iconName="refresh-cw"
                  iconColor="white"
                  iconSize={verticalScale(20)}
                  onPress={() => handleOnPress(item, idx)}
                  disabled={item.disabled}
                />
                <Text
                  style={[
                    styles.compatibilityText,
                    { color: item.disabled ? '#BEBFC0' : moodInfos.color }
                  ]}
                >
                  compatibilité
                </Text>
              </View>
            ))}
          </View>
        ))}
      </Carousel>
        <Feather
          name="chevron-right"
          color={moodInfos.color}
          style={{position: 'absolute', zIndex: 99, right: 0, top: 30}}
          size={verticalScale(30)}
        />
    </View>
  );
}

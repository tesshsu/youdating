import React from 'react';
import { FlatList, Text } from 'react-native';
import UserListItem from '../../../../../Global/UserListItem';
import YousOn from '../../../../../Global/YousOn';
import styles from './styles';
import ListItemSeparator from '../../../../../Global/ListItemSeparator';

const MAN1 = require('../../../../../../../assets/images/profile_pics/man1.png');
const MAN2 = require('../../../../../../../assets/images/profile_pics/man2.png');
const GIRL1 = require('../../../../../../../assets/images/profile_pics/girl1.png');

const data = [
  { username: 'Jason', avatar: MAN1 },
  { username: 'Yelena', avatar: GIRL1 },
  { username: 'Etienne', avatar: MAN2 },
  { username: 'Marie', avatar: GIRL1 },
  { username: 'Tom', avatar: MAN1 },
  { username: 'Samuel', avatar: MAN2 },
];

function randomHour() {
  return Math.floor(Math.random() * 16) + 1;
}

export default function Sent() {
  return (
    <FlatList
      data={data}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={ListItemSeparator}
      keyExtractor={item => item.username}
      renderItem={({ item }) => (
        <UserListItem
          image={item.avatar}
          title={item.username}
          subTitle={subTitleProps => (
            <YousOn online>
              <Text {...subTitleProps}>33 ANS-MONTPELLIER</Text>
            </YousOn>
          )}
          subSubTitle="Vous avez envoyé une attraction"
          rightText={`il y a ${randomHour()}h`}
        />
      )}
    />
  );
}

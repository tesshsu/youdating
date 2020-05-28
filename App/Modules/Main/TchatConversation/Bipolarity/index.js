import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import PageHeader from '../../../Global/PageHeader';
import RoundButton from '../../../Global/RoundButton';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import NavigationHelper from '../../../../Helpers/NavigationHelper';

const IMAGE_PISCINE = require('../../../../../assets/images/piscine.png');
const IMAGE_PLAGE = require('../../../../../assets/images/plage.png');

export default function MainTchatConvversationBipolarity() {
  const { moodInfos } = useCurrentMood();

  return (
    <>
      <PageHeader
        title="Bipolarity"
        backButton
        rightComponent={() => (
          <Feather
            name="info"
            color="white"
            size={20}
            onPress={() => {
              NavigationHelper.navigate('MainTchatConversationBipolarityHistoric');
            }}
          />
        )}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text
          style={[
            styles.moodTitleText,
            { color: moodInfos.color }
          ]}
        >
          {`Mood ${moodInfos.title}`}
        </Text>
        <RoundButton
            text="Pack1: Gout et Interetes"
            fontSize={12}
            borderRadius={15}
            width={280}
            height={30}
            onPress={() => NavigationHelper.navigate(' MainTchatConversationBipolarity')}
        />
        <Text style={styles.questionText}>Question n°1</Text>
        <Text style={styles.text}>Quelle ambiance te correspond le plus ?</Text>
        <View style={styles.line} />
        <View style={styles.imagesContainer}>
          <TouchableOpacity>
            <ImageBackground
              style={styles.imageBackground}
              imageStyle={styles.imageBackgroundImage}
              source={IMAGE_PISCINE}
            />
            <Text style={styles.imageLabelText}>Piscine</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <ImageBackground
              style={styles.imageBackground}
              imageStyle={styles.imageBackgroundImage}
              source={IMAGE_PLAGE}
            />
            <Text style={styles.imageLabelText}>Plage</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

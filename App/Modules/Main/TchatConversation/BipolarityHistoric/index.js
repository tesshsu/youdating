import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ImageBackground
} from 'react-native';

import styles from './styles';
import PageHeader from '../../../Global/PageHeader';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import RoundButton from '../../../Global/RoundButton';
import { verticalScale } from '../../../../Helpers/ScaleHelper';
import RoundIconButton from '../../../Global/RoundIconButton';
import NavigationHelper from '../../../../Helpers/NavigationHelper';
import {BIPOLARITY_QUETIONS} from '../Questions';
const IMAGE_PLAGE = require('../../../../../assets/images/plage.png');
const IMAGE_FERRARI = require('../../../../../assets/images/ferrari.png');
const IMAGE_MASERATTI = require('../../../../../assets/images/maseratti.png');

export default function BipolarityHistoric() {
  const [buttonContainerHeight, setButtonContainerheight] = useState(null);
  const [currentPack, setCurrentPack] = useState(0);
  const { moodInfos } = useCurrentMood();

  function onButtonContainerLayout(ev) {
    const { height } = ev.nativeEvent.layout;

    if (buttonContainerHeight === null) {
      setButtonContainerheight(height);
    }
  }

  return (
    <>
      <PageHeader
        title="Historique"
        backButton
      />
      <View style={styles.container}>
        <Text
          style={[
            styles.moodTitleText,
            { color: moodInfos.color }
          ]}
        >
          {`Mood ${moodInfos.title}`}
        </Text>
        <Text style={styles.resultText}>Résultats</Text>
        <View style={styles.packsContainer}>
          <RoundButton
            text="PACK 1"
            borderRadius={verticalScale(10)}
            backgroundColor={currentPack === 0 ? '#69A7F1' : '#D2D2D2'}
            onPress={() => setCurrentPack(0)}
            containerStyle={styles.pack}
          />
        </View>
        <View style={styles.scrollviewContainer}>
          <ScrollView
            contentContainerStyle={[
              styles.scrollviewContent,
              { paddingBottom: buttonContainerHeight + verticalScale(40) }
            ]}
          >
            <View style={styles.answerOuter}>
              <View style={styles.answerCard}>
                <Text style={styles.responseTitleText}>Reponse N°1</Text>
                <Text style={styles.responseLabelText}>{BIPOLARITY_QUETIONS[0].question}</Text>
                <View style={styles.answersContainer}>
                  <View style={styles.answerContainer}>
                    <Text>TOI</Text>
                    <ImageBackground
                      source={BIPOLARITY_QUETIONS[0].avatarA}
                      style={styles.imageBackground}
                      imageStyle={styles.imageBackgroundImage}
                    />
                    <Text style={styles.answerText}>{BIPOLARITY_QUETIONS[0].answerA}</Text>
                  </View>
                  <RoundIconButton
                    iconName="thumbs-up"
                    iconColor="white"
                    iconSize={verticalScale(15)}
                    size={verticalScale(32)}
                    backgroundColor={moodInfos.color}
                    containerStyle={styles.thumbsUp}
                  />
                  <View style={styles.answerContainer}>
                    <Text>HENRY</Text>
                    <ImageBackground
                      source={BIPOLARITY_QUETIONS[0].avatarB}
                      style={styles.imageBackground}
                      imageStyle={styles.imageBackgroundImage}
                    />
                    <Text style={styles.answerText}>{BIPOLARITY_QUETIONS[0].answerB}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.answerOuter}>
              <View style={styles.answerCard}>
                <Text style={styles.responseTitleText}>Reponse N°2</Text>
                <Text style={styles.responseLabelText}>{BIPOLARITY_QUETIONS[1].question}</Text>
                <View style={styles.answersContainer}>
                  <View style={styles.answerContainer}>
                    <Text>TOI</Text>
                    <ImageBackground
                      source={BIPOLARITY_QUETIONS[1].avatarA}
                      style={styles.imageBackground}
                      imageStyle={styles.imageBackgroundImage}
                    />
                    <Text style={styles.answerText}>{BIPOLARITY_QUETIONS[1].answerA}</Text>
                  </View>
                  <RoundIconButton
                    iconName="thumbs-up"
                    iconColor="white"
                    iconSize={verticalScale(15)}
                    size={verticalScale(32)}
                    backgroundColor={moodInfos.color}
                    containerStyle={styles.thumbsUp}
                    disabled
                    onPress={() => {}}
                  />
                  <View style={styles.answerContainer}>
                    <Text>HENRY</Text>
                    <ImageBackground
                      source={BIPOLARITY_QUETIONS[1].avatarB}
                      style={styles.imageBackground}
                      imageStyle={styles.imageBackgroundImage}
                    />
                    <Text style={styles.answerText}>{BIPOLARITY_QUETIONS[1].answerB}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.compatibilityResult}>
              <Text style={styles.compatibilityResultTitle}>{`Compatibilité d'interets pack ${currentPack + 1}`}</Text>
              <Text style={styles.compatibilityPercentageText}>
                80%
              </Text>
            </View>
          </ScrollView>
          <View style={styles.buttonContainer} onLayout={onButtonContainerLayout}>
            <SafeAreaView>
              <RoundButton
                containerStyle={styles.button}
                backgroundColor={moodInfos.color}
                text="revenir plus tard"
                color="white"
                borderRadius={23}
                onPress={() => { NavigationHelper.back(); }}
              />
            </SafeAreaView>
          </View>
        </View>
      </View>
    </>
  );
}

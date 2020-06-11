import React, { useCallback, useState, useMemo } from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  ImageBackground, TouchableOpacity, Image
} from 'react-native';

import styles from './styles';
import PageHeader from '../../../Global/PageHeader';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import RoundButton from '../../../Global/RoundButton';
import { verticalScale } from '../../../../Helpers/ScaleHelper';
import NavigationHelper from '../../../../Helpers/NavigationHelper';
import * as Questions from '../Questions';
import Carousel from '../../../Global/Carousel';
import useLogguedUser from '../../../../Hooks/useLogguedUser';
import useConversation from '../../../../Hooks/useConversations';

export default function BipolarityHistoric() {
  const [carouselIndex, setCarrouselIndex] = useState(0);
  const [buttonContainerHeight, setButtonContainerheight] = useState(null);
  const [currentPack, setCurrentPack] = useState(0);
  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser } = useLogguedUser();
  const {
    startConversation
  } = useConversation();
  const slicedQuestions = [];
  const setCountA = () => {
    setCounterA(countA + 1);
    console.log('countA', countA);
  };

  const setCountB = () => {
    setCounterB(countB + 1);
    console.log('countB', countB);
  };

  function onButtonContainerLayout(ev) {
    const { height } = ev.nativeEvent.layout;

    if (buttonContainerHeight === null) {
      setButtonContainerheight(height);
    }
  }
  
  const ModeQuestions = useMemo(() => Questions[currentMood][questions].question, [currentMood, question]);
  ModeQuestions.forEach((u) => {
    const lastArray = slicedQuestions[slicedQuestions.length - 1];

    if (!lastArray || lastArray.length === 1) {
      slicedQuestions.push([u]);
    } else {
      lastArray.push(u);
    }
  });

  const openConversation = useCallback((conversation) => {
    const {
      user1,
      user2,
      lastMessage
    } = conversation;

    const target = user1.id === logguedUser.id ? user2 : user1;

    if (lastMessage.isOpportunity && lastMessage.author !== logguedUser.id) {
      NavigationHelper.navigate('MainTchatNewMessage', { conversation, target });
    } else {
      startConversation(currentMood, target);
    }
  }, [currentMood, logguedUser.id, startConversation]);

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
        <View style={styles.packsContainer}>
          <RoundButton
            text="PACK 1 : Goûts et Intérêts"
            borderRadius={verticalScale(10)}
            backgroundColor={moodInfos.color}
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
            <Carousel activeIndex={carouselIndex}>
              {slicedQuestions.map((chunk, index) => (
                <View key={index.toString()}>
                  {chunk.map((item, idx) => (
                    <View
                      key={idx.toString()}
                      disabled={item.disabled}
                      style={styles.itemContainer}
                    >
                      <RoundButton
                        text={item.title}
                        fontSize={12}
                        borderRadius={15}
                        width={280}
                        style={styles.passBoutton}
                        height={30}
                      />
                      <Text style={styles.question}>{item.question}</Text>
                      <View style={styles.line} />
                      <View style={styles.imageContainer} >
                        <View style={styles.imageBackground}>
                          <TouchableOpacity onClick={setCountA}>
                            <Image source={item.avatarA} style={styles.imageBackgroundImage} />
                            <Text
                              style={[
                                styles.imageLabelText,
                                { color: item.disabled ? '#BEBFC0' : moodInfos.color }
                              ]}
                            >
                              {item.answerA}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.imageBackground}>
                          <TouchableOpacity onClick={setCountB}>
                            <Image source={item.avatarB} style={styles.imageBackgroundImage} />
                            <Text
                              style={[
                                styles.imageLabelText,
                                { color: item.disabled ? '#BEBFC0' : moodInfos.color }
                              ]}
                            >
                              {item.answerB}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </Carousel>
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
                text="DISCUTEZ-EN"
                color="white"
                borderRadius={23}
                onPress={() => openConversation(conversation)}
              />
            </SafeAreaView>
          </View>
        </View>
      </View>
    </>
  );
}

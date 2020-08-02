import React, { useEffect, useCallback, useState, useMemo } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';
import PageHeader from '../../../Global/PageHeader';
import RoundButton from '../../../Global/RoundButton';
import Button from '../../../Global/Button';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import NavigationHelper from '../../../../Helpers/NavigationHelper';
import useConversation from '../../../../Hooks/useConversations';
import Carousel from '../../../Global/Carousel';
import useLogguedUser from '../../../../Hooks/useLogguedUser';
import * as Questions from '../Questions';

export default function MainTchatConvversationBipolarity({ navigation }) {
  const { state: { params: { opponent } } } = navigation;
  const [carouselIndex, setCarrouselIndex] = useState(0);
  const [countA, setCounterA] = useState(0);
  const [countB, setCounterB] = useState(0);
  const [answers, setAnswers] = useState([]);
  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser } = useLogguedUser();
  const slicedQuestions = [];
  const setCountA = async () => {
    await setCounterA(countA + 1);
    setAnswer();
  };

  const setCountB = async () => {
    await setCounterB(countB + 1);
    setAnswer();
  };

  const skip = async () => {
    await setAnswers([...answers, {}]);
  }

  const setAnswer = async () => {
    const ans = slicedQuestions[carouselIndex];
    await setAnswers([...answers, ...ans]);
  }

  const next = () => {
    const lastQuestions = answers.length === slicedQuestions.length;
    !lastQuestions ?
      setCarrouselIndex(carouselIndex + 1)
      :
      navigation.navigate('MainTchatConversationBipolarityHistoric', {
        answers,
        countA,
        countB,
        totalQuestion: slicedQuestions.length,
        opponent
      });
  }

  useEffect(() => {
    if (answers.length == carouselIndex + 1) next();
  }, [answers]);

  let QUETIONS = [];
  const ModeQuestions = useMemo(() => Questions[currentMood].QUETIONS, [currentMood, QUETIONS]);
  
  ModeQuestions.forEach((u) => {
    const lastArray = slicedQuestions[slicedQuestions.length - 1];

    if (!lastArray || lastArray.length === 1) {
      slicedQuestions.push([u]);
    } else {
      lastArray.push(u);
    }
  });
  
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
           onPress={() => Alert.alert(
			  "Pour commencer, veuillez cliquer sur l'image ci dessous"
			)}
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
                    text="PACK 1 : Goûts et Intérêts"
                    fontSize={12}
                    borderRadius={15}
                    width={280}
                    style={styles.passBoutton}
                    height={30}
                  />
                  <Text style={styles.questionTitle}>{item.title}</Text>
				  <Text style={styles.question}>{item.question}</Text>
                  <View style={styles.imageContainer} >
                    <View style={styles.imageBackground}>
                      <TouchableOpacity onPress={setCountA}>
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
                      <TouchableOpacity onPress={setCountB}>
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
      </ScrollView>
      <View style={styles.passBoutton}>
        <Button text="Aucun des deux" onPress={skip} />
      </View>
    </>
  );
}

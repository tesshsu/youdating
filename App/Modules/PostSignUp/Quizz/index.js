import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, ImageBackground, SafeAreaView, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import { verticalScale } from '../../../Helpers/ScaleHelper';
import useLogguedUser from '../../../Hooks/useLogguedUser';
import RoundButton from '../../Global/RoundButton';
import RoundIconButton from '../../Global/RoundIconButton';
import QUESTIONS from './questions';
import styles from './styles';

const MAPPING = [
  ['AMBITIONNEL', 'LEADERENT'],
  ['LEADERENT', 'AMBITIONNEL'],
  ['DIPLOMATIST', 'HUANIST'],
  ['HUMANIST', 'DIPLOMATIST']
];

function calculatepersonalities(answers) {
  let persoAnswers = answers.slice(2, 4);

  persoAnswers = persoAnswers
    .reduce((acc, curr) => acc.concat(curr), []);

  const [mappingIndex] = [180, 160, 280, 260].reduce((acc, curr, index) => {
    const count = persoAnswers.filter(a => a === curr).length;

    if (count > acc[1]) {
      return [index, count];
    }

    return acc;
  }, [0, 0]);

  const [main, sub] = MAPPING[mappingIndex];

  return {
    main,
    sub,
    searches: sub
  };
}

export default function PostSignUpQuizz() {
  const { submitQuizzAnswers, logguedUser } = useLogguedUser();
  const [currentScreen, setCurrentScreen] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setCurrentAnswers(answers[currentScreen] || []);
  }, [answers, currentScreen]);

  const answerQuestion = useCallback((index, value) => {
    currentAnswers[index] = value;
    setCurrentAnswers([...currentAnswers]);
  }, [currentAnswers]);

  const profileType = useMemo(() => {
    if (answers.length >= 2) {
      const allAnswers = answers
        .slice(0, 2)
        .reduce((acc, curr) => acc.concat(curr), []);

      const countA = allAnswers.filter(a => a === 1).length;
      const countB = allAnswers.filter(a => a === 2).length;

      return countA > countB ? 'a' : 'b';
    }

    return -1;
  }, [answers]);

  const currentQuestions = useMemo(() => {
    return QUESTIONS.QUESTIONS[currentScreen];
  }, [currentScreen, logguedUser, profileType]);


  async function submitAnswers() {
    try {
      const payload = calculatepersonalities(answers);
      await submitQuizzAnswers(payload);
    } catch (err) {
      Alert.alert('Erreur pour calculer', err);
    }
  }

  function next() {
    answers[currentScreen] = currentAnswers;
    setAnswers([...answers]);
    setCurrentScreen(currentScreen + 1);
  }

  function back() {
    if (currentScreen === 0) {
      NavigationHelper.back();
    } else {
      if (answers[currentScreen]) {
        answers.splice(currentScreen, 1);
        setAnswers([...answers]);
      }

      setCurrentScreen(currentScreen - 1);
    }
  }

  const lastQuestions = currentScreen === QUESTIONS.QUESTIONS.length - 1;

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        imageStyle={styles.imagebackgroundImage}
        source={currentQuestions.image}
      >
        <Text style={styles.questionNumberText}>{`${currentScreen + 1}/6`}</Text>
      </ImageBackground>
      <ScrollView style={styles.scollView} contentContainerStyle={styles.scrollViewContent}>
        {currentQuestions.questions.map((q, i) => (
          <View key={i.toString()} style={styles.question}>
            <Text style={styles.questionTitle}>{q.question}</Text>
            {q.answers.map((a, i2) => (
              <TouchableOpacity
                key={i2.toString()}
                style={styles.answer}
                onPress={() => answerQuestion(i, a.type)}
              >
                <Text
                  style={[
                    styles.answerText,
                    a.type === currentAnswers[i] && { color: '#B45A6F' }
                  ]}
                >
                  {a.answer}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.buttonsRow}>
          <RoundIconButton
            size={verticalScale(48)}
            backgroundColor="#B45A6F"
            iconName="chevron-left"
            iconColor="white"
            iconSize={verticalScale(21)}
            onPress={back}
          />
          {!lastQuestions && (
            <RoundIconButton
              size={verticalScale(48)}
              backgroundColor="#B45A6F"
              containerStyle={[
                currentAnswers.length !== currentQuestions.questions.length && { opacity: 0.6 }
              ]}
              iconName="chevron-right"
              iconColor="white"
              iconSize={verticalScale(21)}
              disabled={currentAnswers.length !== currentQuestions.questions.length}
              onPress={next}
            />
          )}
          {lastQuestions && (
            <View style={{ flex: 1 }}>
              <RoundButton
                text="Decouveres Ta personnalite"
                backgroundColor={currentAnswers.length !== currentQuestions.questions.length ? "#B45A6FCC" : "#B45A6F"}
                containerStyle={styles.buttonFinish}
                height={verticalScale(48)}
                uppercase
                onPress={async () => {
                  await submitAnswers();
                  NavigationHelper.navigate('MainTabsProfile');
                }}
              />
            </View>
          )}
        </View>
        <SafeAreaView />
      </View>
    </View>
  );
}

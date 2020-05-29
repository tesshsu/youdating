import React, {
  useState, useEffect, useCallback, useMemo
} from 'react';
import {
  Text, View, ImageBackground, SafeAreaView, Alert
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import styles from './styles';
import QUESTIONS from './questions';
import NavigationHelper from '../../../Helpers/NavigationHelper';
import RoundIconButton from '../../Global/RoundIconButton';
import { verticalScale } from '../../../Helpers/ScaleHelper';
import useLogguedUser from '../../../Hooks/useLogguedUser';

const MAPPING = [
  ['AMBITIONNEL', 'LEADERENT'],
  ['LEADERENT', 'AMBITIONNEL'],
  ['DIPLOMATIST', 'HUANIST'],
  ['HUMANIST', 'DIPLOMATIST']
];

function calculatePersonnalities(answers) {
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
    if (currentScreen !== 2 && currentScreen !== 3) {
      return QUESTIONS[logguedUser][currentScreen];
    }
    return QUESTIONS[logguedUser][currentScreen][profileType];
  }, [currentScreen, logguedUser, profileType]);
  

  async function submitAnswers() {
    try {
      const payload = calculatePersonnalities(answers);
      await submitQuizzAnswers(payload);
    } catch (err) {
      Alert.alert('Erreur', err);
    }
  }

  function next() {
    answers[currentScreen] = currentAnswers;
    setAnswers([...answers]);
    if (currentScreen === QUESTIONS[logguedUser].length - 1) {
      submitAnswers();
    } else {
      setCurrentScreen(currentScreen + 1);
    }
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
        { currentQuestions.questions.map((q, i) => (
          <View key={i.toString()} style={styles.question}>
            <Text style={styles.questionTitle}>{ q.question }</Text>
            { q.answers.map((a, i2) => (
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
                  { a.answer }
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
        </View>
        <SafeAreaView />
      </View>
    </View>
  );
}

import React, { useEffect, useCallback, useState } from 'react';
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
import Button from '../../../Global/Button';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import NavigationHelper from '../../../../Helpers/NavigationHelper';
import Carousel from '../../../Global/Carousel';
import useLogguedUser from '../../../../Hooks/useLogguedUser';
const IMAGE_PISCINE = require('../../../../../assets/images/piscine.png');
const IMAGE_PLAGE = require('../../../../../assets/images/plage.png');
const IMAGE_LOVE = require('../../../../../assets/images/invite_love.png');
const IMAGE_PERSO = require('../../../../../assets/images/invite_perso.png');
const IMAGE_PRO = require('../../../../../assets/images/invite_pro.png');
const IMAGE_SOCIAL = require('../../../../../assets/images/invite_social.png');

const question_1 = "vous êtes plutôt petit déjeuner ?";
const question_2 = "est-tu ?";
const question_3 = "pour passer une bonne soirée canapétu es plutot ?";
const question_4 = "avec ton partenaire tu préferes plutôt les soirées?";
const question_5 = "en règle genérale quand vous partez en voyage c'est plutôt?";
const question_6 = "en soirée ou dans un apéro vous buvez de ?";
const question_7 = "plutôt du genre  ?";
const question_8 = "vous êtes plutôt ?";
const question_9 = " le week-end vous préferez ?";
const question_10 = "êtes-vous plutôt du genre cuisinier  ?";

const BIPOLARITY_QUETIONS = [
  {
    id: 0,
    title: 'question n1',
    question: question_1,
    avatarA: IMAGE_PISCINE,
    avatarB: IMAGE_PLAGE,
    answerA: 'sucré',
    answerB: 'salé'
  },
  {
    id: 1,
    title: 'question n2',
    question: question_2,
    avatarA: IMAGE_LOVE,
    avatarB: IMAGE_PERSO,
    answerA: 'fumeur',
    answerB: 'non fumeur'
  },
  {
    id: 2,
    title: 'question n3',
    question: question_3,
    avatarA: IMAGE_PRO,
    avatarB: IMAGE_SOCIAL,
    answerA: 'film',
    answerB: 'série'
  },
  {
    id: 3,
    title: 'question n4',
    question: question_4,
    avatarA: IMAGE_PISCINE,
    avatarB: IMAGE_PLAGE,
    answerA: 'en extérieur avec du monde autour',
    answerB: 'en intérieur dans un cadre intimiste'
  },
  {
    id: 4,
    title: 'question n5',
    question: question_5,
    avatarA: IMAGE_PISCINE,
    avatarB: IMAGE_PLAGE,
    answerA: ' voyage organisé',
    answerB: 'voyage à la dernières minutes'
  },
  {
    id: 5,
    title: 'question n6',
    question: question_6,
    avatarA: IMAGE_PISCINE,
    avatarB: IMAGE_PLAGE,
    answerA: ' l\'alcool en tout genre',
    answerB: 'des jus de fruit,soft'
  },
  {
    id: 6,
    title: 'question n7',
    question: question_7,
    avatarA: IMAGE_PISCINE,
    avatarB: IMAGE_PLAGE,
    answerA: 'couche tard',
    answerB: 'couche tôt'
  },
  {
    id: 7,
    title: 'question n8',
    question: question_8,
    avatarA: IMAGE_PISCINE,
    avatarB: IMAGE_PLAGE,
    answerA: 'grand cercle d\'amis',
    answerB: 'cercle d\'amis restreint'
  },
  {
    id: 8,
    title: 'question n9',
    question: question_9,
    avatarA: IMAGE_PISCINE,
    avatarB: IMAGE_PLAGE,
    answerA: 'les activités distrayantes',
    answerB: 'les activités distrayantes'
  },
  {
    id: 9,
    title: 'question n10',
    question: question_10,
    avatarA: IMAGE_PISCINE,
    avatarB: IMAGE_PLAGE,
    answerA: 'expert',
    answerB: 'debutant'
  }
];

export default function MainTchatConvversationBipolarity() {
  const [carouselIndex, setCarrouselIndex] = useState(0);
  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser } = useLogguedUser();

  const slicedQuestions = [];
  BIPOLARITY_QUETIONS.forEach((u) => {
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
        <Carousel activeIndex={carouselIndex}>
          { slicedQuestions.map((chunk, index) => (
            <View key={index.toString()}>
              { chunk.map((item, idx) => (
                <View
                  key={idx.toString()}
                  disabled={item.disabled}
                  style={styles.itemContainer}
                  onPress={() => handleOnPress(item, index)}
                >
                  <RoundButton
                    text= { item.title }
                    fontSize={12}
                    borderRadius={15}
                    width={280}
                    style={styles.passBoutton}
                    height={30}
                    onPress={() => handleOnPress(item, idx)}
                  />
                  <Text style={styles.question}>{ item.question }</Text>
                  <View style={styles.line} />
                  <View style={styles.imageContainer} >
                    <TouchableOpacity>
                      <ImageBackground
                        style={styles.imageBackground}
                        imageStyle={styles.imageBackgroundImage}
                        source={item.avatarA}
                      />
                      <Text
                        style={[
                          styles.imageLabelText,
                          { color: item.disabled ? '#BEBFC0' : moodInfos.color }
                        ]}
                      >
                        { item.answerA }
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <ImageBackground
                        style={styles.imageBackground}
                        imageStyle={styles.imageBackgroundImage}
                        source={item.avatarB}
                      />
                      <Text
                        style={[
                          styles.imageLabelText,
                          { color: item.disabled ? '#BEBFC0' : moodInfos.color }
                        ]}
                      >
                        { item.answerB }
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </Carousel>
      </ScrollView>
      <View style={styles.passBoutton}>
        <Button text="Je pass mon tour" onPress={() => NavigationHelper.navigate('MainTabsTchat')} />
      </View>
    </>
  );
}

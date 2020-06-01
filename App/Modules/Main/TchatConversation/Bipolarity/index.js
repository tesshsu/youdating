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
import {BIPOLARITY_QUETIONS} from '../Questions';

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

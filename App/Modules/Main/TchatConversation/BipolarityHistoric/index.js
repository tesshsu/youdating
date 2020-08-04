import React, { useCallback, useState, useMemo } from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import NavigationHelper from '../../../../Helpers/NavigationHelper';
import { verticalScale } from '../../../../Helpers/ScaleHelper';
import useConversation from '../../../../Hooks/useConversations';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import useLogguedUser from '../../../../Hooks/useLogguedUser';
import Carousel from '../../../Global/Carousel';
import PageHeader from '../../../Global/PageHeader';
import RoundButton from '../../../Global/RoundButton';
import * as Questions from '../Questions';
import styles from './styles';

export default function BipolarityHistoric({ navigation }) {
  const { state: { params } } = navigation;
  const [carouselIndex, setCarrouselIndex] = useState(0);
  const [buttonContainerHeight, setButtonContainerheight] = useState(null);
  const [currentPack, setCurrentPack] = useState(0);
  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser } = useLogguedUser();
  const {
	conversations,
    startConversation
  } = useConversation();
  const slicedAnswers = [];
  let conversation, opponentAnswer;
  function onButtonContainerLayout(ev) {
    const { height } = ev.nativeEvent.layout;

    if (buttonContainerHeight === null) {
      setButtonContainerheight(height);
    }
  }

  params.answers.forEach((u) => {
    const lastArray = slicedAnswers[slicedAnswers.length - 1];

    if (!lastArray || lastArray.length === 1) {
      slicedAnswers.push([u]);
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
            contentContainerStyle={styles.scrollviewContent}
          >
            <Carousel activeIndex={carouselIndex}>
              {slicedAnswers.map((chunk, index) => (
                <View key={index.toString()}>
                  {chunk.map((item, idx) => (
                    <View
                      key={idx.toString()}
                      disabled={item.disabled}
                      style={styles.itemContainer}
                    >
                      <Text style={styles.title}>REPONSE N {index+1}</Text>
                      <Text style={styles.question}>{item.question} </Text>
                      <View style={styles.line} />
                      <View style={styles.imageContainer}>

                        {item.avatarA && (
                          <View style={styles.imageBackground}>
                            <Image source={item.avatarA} style={styles.imageBackgroundImage} />
                            <Text  style={styles.imageToiText} >TOI</Text>
                            <Text
                              style={[
                                styles.imageLabelText,
                                { color: item.disabled ? '#BEBFC0' : moodInfos.color }
                              ]}
                            >
                              {item.answerA}
                            </Text>
                          </View>
                        )}

                        { (!item.avatarA || !item.avatarB)  && (
                          <View style={styles.imageBackground}>
                            <View style={styles.noAnswer}>
                              <Text style={styles.noAnswerText}>
                                Tu n'as pas répondu
                            </Text>
                            </View>
                          </View>
                        )}

                        { opponentAnswer ? (
                             <View style={styles.imageBackground}>
                                 <Image source={opponentAnswer.item.avatarA} style={styles.imageBackgroundImage} />
                                 <Text  style={styles.imageToiText} >{ params.opponent.firstName }</Text>
                                 <Text
                                      style={[
                                               styles.imageLabelText,
                                                { color: item.disabled ? '#BEBFC0' : moodInfos.color }
                                             ]}
                                      >
                                      {opponentAnswer.item.answerA}
                                  </Text>
                             </View>
                         ): (
                               <View style={styles.imageBackground}>
                                     <View style={styles.noAnswer}>
                                         <Text style={styles.noAnswerText}>
                                            En ATTENDEN DE REPONSE DE { params.opponent.firstName }
                                          </Text>
                                     </View>

                                </View>
                         )
                         }
                      </View>
                       <View style={styles.compatibilityResult}>
                                    <Text style={styles.compatibilityResultTitle}>{`Compatibilité d'interets pack ${currentPack + 1}`}</Text>
                                    <Text style={styles.compatibilityPercentageText}>
                                      {(params.countA * params.totalQuestion)}%
                                    </Text>
                       </View>
                                  {index != 9 ? (
                                                  <RoundButton
                                                      containerStyle={styles.button}
                                                      backgroundColor={moodInfos.color}
                                                      text="DISCUTEZ-EN"
                                                      color="white"
                                                      borderRadius={23} MainTabsTchatList
                                                      onPress={() => startConversation(currentMood, target)}
                                                  />
                                                  ) : (
                                                        <RoundButton
                                                             containerStyle={styles.button}
                                                             backgroundColor={moodInfos.color}
                                                             text="REVIENT PLUS TARD"
                                                             color="white"
                                                             borderRadius={23} MainTabsTchatList
                                                             onPress={() => NavigationHelper.navigate('MainTabsProfile')}
                                                        />
                                                   )
                                  }

                    </View>
                  ))}
                </View>
              ))}
            </Carousel>
          </ScrollView>
        </View>
      </View>
    </>
  );
}

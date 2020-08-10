import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { AppState, Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import NavigationHelper from '../../../../Helpers/NavigationHelper';
import { verticalScale } from '../../../../Helpers/ScaleHelper';
import useConversation from '../../../../Hooks/useConversations';
import useCurrentMood from '../../../../Hooks/useCurrentMood';
import useLogguedUser from '../../../../Hooks/useLogguedUser';
import useBipolarities from '../../../../Hooks/useBipolarities';
import Carousel from '../../../Global/Carousel';
import PageHeader from '../../../Global/PageHeader';
import RoundButton from '../../../Global/RoundButton';
import * as Questions from '../Questions';
import styles from './styles';
import { Feather } from '@expo/vector-icons';

export default function BipolarityHistoric({ navigation }) {
  const { state: { params } } = navigation;
  const [carouselIndex, setCarrouselIndex] = useState(0);
  const [buttonContainerHeight, setButtonContainerheight] = useState(null);
  const [currentPack, setCurrentPack] = useState(0);
  const { currentMood, moodInfos } = useCurrentMood();
  const { logguedUser } = useLogguedUser();
  const { bipolarityRequests, get: getBipolarity } = useBipolarities();

  const {
	conversations,
    startConversation
  } = useConversation();
  const slicedAnswers = [];
  const score = params.score;
  const opponent = params.opponent;
  let conversation, opponentAnswer;
  let QUESTIONS = [];
  const ModeQuestions = useMemo(() => Questions[currentMood].QUESTIONS, [currentMood, QUESTIONS]);
  let answers =  params.answers ?  params.answers : ModeQuestions;

  // retrieve the opponent response
  const currentBipolarities = bipolarityRequests?.bipolarityRequests?.filter( (bp) => {
      return (bp.target.id === opponent.id && bp.author.id === logguedUser.id)
            || (bp.target.id === logguedUser.id && bp.author.id === opponent.id) ;
   });

   const currentBipolarity = currentBipolarities?.length > 0 ? currentBipolarities[0]: undefined;

  function onButtonContainerLayout(ev) {
    const { height } = ev.nativeEvent.layout;

    if (buttonContainerHeight === null) {
      setButtonContainerheight(height);
    }
  }
  answers?.forEach((u) => {
    const lastArray = slicedAnswers[slicedAnswers.length - 1];

    if (!lastArray || lastArray.length === 1) {
      slicedAnswers.push([u]);
    } else {
      lastArray.push(u);
    }
  });

  // update with backend answer
  slicedAnswers.forEach((slice) => {
     const answer = currentBipolarity?.questions?.filter(q => q.questionId === slice[0].id.toString());
     if(logguedUser.id === currentBipolarity.author?.id ){
        slice[0].response = answer[0].authorResponse;
        slice[0].opponentResponse = answer[0].targetResponse;
     } else {
         slice[0].response = answer[0].targetResponse;
         slice[0].opponentResponse =  answer[0].authorResponse;
     }
  });


  // We have response an
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

    useEffect(() => {
       getBipolarity(opponent);
    }, [getBipolarity, bipolarityRequests]);


  return (
    <>
      <PageHeader
        title="Historique"
        leftComponent={() => (
                 <Feather
                         name="chevron-left"
                         color='white'
                         size={21}
                         onPress={() => NavigationHelper.navigate('MainTabsTchatList')}
                     />
                 )}
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

                        {item.response === 'A' && (
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
                        {item.response === 'B' && (
                           <View style={styles.imageBackground}>
                             <Image source={item.avatarB} style={styles.imageBackgroundImage} />
                             <Text  style={styles.imageToiText} >TOI</Text>
                             <Text
                               style={[
                                 styles.imageLabelText,
                                 { color: item.disabled ? '#BEBFC0' : moodInfos.color }
                               ]}
                             >
                               {item.answerB}
                             </Text>
                           </View>
                         )}

                        { (item.response !== 'A' && item.response !== 'B')  && (
                          <View style={styles.imageBackground}>
                            <View style={styles.noAnswer}>
                              <Text style={styles.noAnswerText}>
                                Tu n'as pas répondu
                            </Text>
                            </View>
                          </View>
                        )}

                        { (item.opponentResponse === 'A' ) && (
                             <View style={styles.imageBackground}>
                                 <Image source={item.avatarA} style={styles.imageBackgroundImage} />
                                 <Text  style={styles.imageToiText} >{ params.opponent.firstName }</Text>
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
                          { (item.opponentResponse === 'B' ) && (
                              <View style={styles.imageBackground}>
                                  <Image source={item.avatarB} style={styles.imageBackgroundImage} />
                                  <Text  style={styles.imageToiText} >{ params.opponent.firstName }</Text>
                                  <Text
                                       style={[
                                                styles.imageLabelText,
                                                 { color: item.disabled ? '#BEBFC0' : moodInfos.color }
                                              ]}
                                       >
                                       {item.answerB}
                                   </Text>
                              </View>
                          )}


                        { (item.opponentResponse !== 'A' && item.opponentResponse !== 'B')  && (
                               <View style={styles.imageBackground}>
                                     <View style={styles.noAnswer}>
                                         <Text style={styles.noAnswerText}>
                                            En ATTENTE DE REPONSE DE { params.opponent.firstName }
                                          </Text>
                                     </View>

                                </View>
                         )}
                      </View>
                       <View style={styles.compatibilityResult}>
                                    <Text style={styles.compatibilityResultTitle}>{`Compatibilité d'interets pack ${currentPack + 1}`}</Text>
                                    <Text style={styles.compatibilityPercentageText}>
                                      { score }%
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

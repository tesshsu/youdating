import { Dimensions, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../../../Helpers/ScaleHelper';

const { width, height } = Dimensions.get('window');


export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(10),
    alignItems: 'stretch',
  },
  moodTitleText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(16),
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  resultText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(18),
    textTransform: 'uppercase',
    textAlign: 'center',
    marginVertical: verticalScale(17)
  },
  packsContainer: {
    alignItems: 'center',
    paddingHorizontal: verticalScale(30),
    marginTop: 10
  },
  pack: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(90),
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
    borderRadius: verticalScale(10)
  },
  compatibilityResult: {
    borderTopColor: '#CECBCB',
    borderTopWidth: 1,
    borderBottomColor: '#CECBCB',
    borderBottomWidth: 1,
    marginTop: verticalScale(0),
    marginBottom: verticalScale(0),
    marginHorizontal: verticalScale(10),
  },
  compatibilityResultTitle: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(16),
    textAlign: 'center',
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(8),
    textTransform: 'uppercase'
  },
  compatibilityPercentageText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(20),
    color: '#69A7F1',
    textAlign: 'center',
    paddingBottom: 7
  },
  responseTitleText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(15),
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  responseLabelText: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: moderateScale(16),
    marginVertical: verticalScale(15),
    color: '#7D7D7D',
    textAlign: 'center'
  },
  scrollviewContent: {
    flex: 1,
    alignItems: 'center',
  },
  answerCard: {
    borderBottomColor: '#CECBCB',
    borderBottomWidth: 1,
    paddingVertical: verticalScale(15)
  },
  answersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  thumbsUp: {
    marginHorizontal: scale(7)
  },
  answerContainer: {
    alignItems: 'center',
    flex: 1
  },
  scrollviewContainer: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 2,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    width: scale(187),
    height: verticalScale(37),
    marginTop: 10,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 2
  },
  itemContainer: {
    width,
    alignItems: 'center'
  },
  imageContainer: {
    justifyContent: 'center',
    width,
  },
  imageBackground: {
    width: scale(420),
    alignItems: 'center',
    marginBottom: 10,
  },
  imageLabelText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(15),
    alignSelf: 'flex-start',
    marginTop: 5,
    marginHorizontal: 70
  },
  imageBackgroundImage: {
    width: scale(280),
    height: verticalScale(150),
    borderRadius: verticalScale(30),
  },
  noAnswer: {
    width: scale(280),
    height: verticalScale(150),
    borderRadius: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4f4f4f'
  },
  noAnswerText:{
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 30,
    textAlign: 'center'
  },
  moodTitleText: {
    textAlign: 'center',
    fontFamily: 'Segoe-UI-Regular',
    textTransform: 'uppercase',
    fontSize: moderateScale(19),
  },
  title: {
    fontFamily: 'Segoe-UI-Regular',
    textTransform: 'uppercase',
    color: '#7D7D7D',
    marginTop: 10,
    marginLeft: 30,
    fontWeight: 'bold'
  },
  question: {
    fontFamily: 'Segoe-UI-Regular',
    textTransform: 'uppercase',
    color: '#7D7D7D',
    marginTop: 5,
    marginHorizontal: 30,
    textAlign: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#7D7D7D',
    marginBottom: 10
  },
  passBoutton: {
    marginBottom: 10,
  },
  ResultTitleText: {
       textAlign: 'center',
       fontSize: moderateScale(15),
       marginTop: 10
   },
   imageToiText: {
      fontFamily: 'Segoe-UI-Bold',
      fontSize: moderateScale(25),
      textTransform: 'uppercase',
      color: 'white',
      position: 'absolute',
      alignSelf: 'center',
      marginTop: 50
   }
});

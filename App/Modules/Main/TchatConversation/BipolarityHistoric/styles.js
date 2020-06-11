import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(24),
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
    marginTop: 20
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
    paddingVertical: verticalScale(13),
    borderTopColor: '#CECBCB',
    borderTopWidth: 1,
    borderBottomColor: '#CECBCB',
    borderBottomWidth: 1,
    marginTop: verticalScale(40),
    marginBottom: verticalScale(5),
    marginHorizontal: verticalScale(30)
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
    textAlign: 'center'
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
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(60),
    paddingHorizontal: scale(20),
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
  imageBackground: {
    width: '100%',
    height: verticalScale(95)
  },
  scrollviewContainer: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  button: {
    width: scale(187),
    height: verticalScale(47),
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 2
  }
});

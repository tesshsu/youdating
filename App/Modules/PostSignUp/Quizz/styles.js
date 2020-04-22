import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  imageBackground: {
    width: '100%',
    height: verticalScale(250),
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: verticalScale(6)
  },
  imagebackgroundImage: {
    width: '100%',
    height: verticalScale(250),
    resizeMode: 'cover'
  },
  questionNumberText: {
    fontFamily: 'NewTaiLue-Bold',
    textAlign: 'center',
    fontSize: moderateScale(17),
    color: 'white'
  },
  scrollView: {
    flex: 1
  },
  scrollViewContent: {
    paddingHorizontal: scale(50),
    paddingBottom: verticalScale(100)
  },
  question: {
    marginTop: verticalScale(25)
  },
  questionTitle: {
    fontFamily: 'NewTaiLue-Bold',
    textAlign: 'center',
    color: '#B45A6F',
  },
  answer: {
    marginTop: verticalScale(18)
  },
  answerText: {
    fontFamily: 'NewTaiLue-Regular',
    textAlign: 'center',
    fontSize: moderateScale(14),
    color: '#838485'
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: scale(30)
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

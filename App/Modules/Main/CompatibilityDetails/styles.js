import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: verticalScale(50)
  },
  matchingText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(27),
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  usernameText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(21),
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  compatibilityText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(22),
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: verticalScale(17),
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    marginVertical: verticalScale(10),
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.45,
    shadowOffset: {
      width: 0,
      height: 1
    },
    paddingTop: verticalScale(10),
    shadowRadius: 3
  },
  resultValueText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(30),
    textAlign: 'center',
    textTransform: 'uppercase',
    textShadowColor: 'black',
    textShadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.45,
    textShadowRadius: 3
  },
  personnalityText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(24),
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  personnalityTypeText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(20),
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  personnalityDescText: {
    fontFamily: 'NewTaiLue-Bold',
    textAlign: 'center',
    fontSize: moderateScale(15),
    color: 'white',
    marginVertical: verticalScale(18)
  }
});

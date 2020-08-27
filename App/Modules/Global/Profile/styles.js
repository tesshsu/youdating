import { StyleSheet } from 'react-native';

import { verticalScale, moderateScale, scale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  scrollViewContent: {
    paddingBottom: verticalScale(60),
  },
  headerTextContainer: {
    position: 'relative'
  },
  headerText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: { width: 0, height: 0 },
    elevation: 2
  },
  subPersonalText: {
      fontFamily: 'Gadugi-Bold',
      fontSize: moderateScale(16),
      fontWeight: 'bold',
      color: 'white',
      textShadowColor: 'black',
      textShadowRadius: 3,
      textShadowOffset: { width: 0, height: 0 },
      elevation: 2,
      marginTop: verticalScale(10)
   },
  headerOnline: {
    width: scale(6),
    height: verticalScale(6),
    borderRadius: scale(3),
    position: 'absolute',
    right: scale(-10),
    top: verticalScale(2),
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: { y: 0, x: 0 },
    elevation: 2
  },
  buttomOnline: {
    width: scale(36),
    height: verticalScale(16),
    position: 'absolute',
    left: scale(3),
    top: verticalScale(55)
  },
  nameProfil: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(26),
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: { width: 0, height: 0 },
    elevation: 2
  },
  perfonaliteText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(23),
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3
  },
});

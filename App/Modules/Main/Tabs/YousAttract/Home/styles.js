import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  pressHereText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(16),
    color: '#6D6D6D',
    marginBottom: verticalScale(13),
    paddingHorizontal: scale(15),
    textAlign: 'center'
  },
  yousAttractTitleText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(18),
    color: 'black',
    marginTop: verticalScale(20),
    textTransform: 'uppercase'
  },
  moodText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(25),
    textTransform: 'uppercase'
  },
  absoluteButton: {
    position: 'absolute',
    top: verticalScale(77),
    left: scale(16),
    width: scale(156),
    height: verticalScale(35)
  }
});

import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale, scale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    fontFamily: 'Gadugi-Bold',
    color: 'white',
    fontSize: moderateScale(11),
    transform: [
      { translateY: verticalScale(-1) }
    ]
  },
  chevronLeft: {
    marginLeft: scale(8)
  }
});

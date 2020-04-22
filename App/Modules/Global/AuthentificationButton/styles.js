import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  button: {
    width: scale(193),
    height: verticalScale(43),
    borderRadius: verticalScale(26),
    backgroundColor: '#89B8E5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontFamily: 'NewTaiLue-Bold',
    color: 'white',
    fontSize: moderateScale(17),
    textAlign: 'center',
  }
});

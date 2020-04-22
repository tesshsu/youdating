import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(30),
    borderRadius: verticalScale(28),
    backgroundColor: 'white',
    marginTop: verticalScale(10)
  },
  text: {
    fontFamily: 'NewTaiLue-Bold',
    textAlign: 'center',
    fontSize: moderateScale(17)
  }
});

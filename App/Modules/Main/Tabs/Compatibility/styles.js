import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(15),
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: verticalScale(25),
    marginBottom: verticalScale(15)
  }
});

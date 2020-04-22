import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(40),
    paddingHorizontal: scale(30),
    marginTop: verticalScale(10),
  },
  labelText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(12),
    color: 'black',
    textTransform: 'uppercase'
  }
});

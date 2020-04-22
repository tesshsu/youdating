import { StyleSheet } from 'react-native';
import { moderateScale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(16)
  }
});

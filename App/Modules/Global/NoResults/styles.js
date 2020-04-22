import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  empty: {
    padding: verticalScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20)
  },
  emptyText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(16),
    textTransform: 'uppercase',
    color: '#7E7E7E',
    textAlign: 'center',
  }
});

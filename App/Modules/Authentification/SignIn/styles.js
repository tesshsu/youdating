import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: scale(63),
    paddingTop: verticalScale(67),
    paddingBottom: verticalScale(140),
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'flex-end'
  }
});

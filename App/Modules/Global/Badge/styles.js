import { StyleSheet } from 'react-native';
import { verticalScale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    position: 'relative'
  },
  badgeContainer: {
    position: 'absolute',
    top: verticalScale(5),
    right: verticalScale(5),
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 0,
      height: verticalScale(2)
    },
    justifyContent: 'center',
    alignItems: 'center'
  }
});

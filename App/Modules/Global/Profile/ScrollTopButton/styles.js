import { StyleSheet } from 'react-native';
import { verticalScale } from '../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: verticalScale(60),
    right: verticalScale(20)
  }
});

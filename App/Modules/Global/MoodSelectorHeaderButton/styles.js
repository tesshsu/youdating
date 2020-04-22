import { StyleSheet } from 'react-native';
import { verticalScale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  image: {
    width: verticalScale(30),
    height: verticalScale(30),
    resizeMode: 'cover'
  }
});

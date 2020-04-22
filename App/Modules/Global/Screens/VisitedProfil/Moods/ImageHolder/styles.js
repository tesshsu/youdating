import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  imageBackground: {
    borderWidth: verticalScale(2),
    borderColor: 'transparent',
    width: scale(100),
    height: verticalScale(70),
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: scale(100) - verticalScale(4),
    height: verticalScale(70 - 4),
    resizeMode: 'cover'
  }
});

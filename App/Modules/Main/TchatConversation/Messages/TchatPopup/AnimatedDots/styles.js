import { StyleSheet } from 'react-native';
import { verticalScale, scale } from '../../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  dotsContainer: {
    width: scale(25),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dot: {
    width: verticalScale(4),
    height: verticalScale(4),
    borderRadius: verticalScale(4) / 2,
    backgroundColor: 'white'
  }
});

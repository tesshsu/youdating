import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  scrollView: {
    flex: 1
  },
  scrollViewContent: {
    paddingHorizontal: scale(30),
    paddingBottom: verticalScale(30)
  },
});

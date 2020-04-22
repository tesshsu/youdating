import { StyleSheet } from 'react-native';
import { verticalScale, scale } from '../../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  content: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(17)
  },
  sectionHeader: {
    fontFamily: 'Gadugi-Bold',
    fontSize: 15,
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingBottom: verticalScale(10),
    paddingTop: verticalScale(30),
    backgroundColor: 'white'
  }
});

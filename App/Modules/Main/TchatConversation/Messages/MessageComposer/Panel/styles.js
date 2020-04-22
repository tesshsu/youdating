import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    borderTopWidth: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(30),
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleText: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(10),
    textTransform: 'uppercase',
  },
  mediaContainer: {
    paddingTop: verticalScale(5),
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
});

import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(15),
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: verticalScale(15)
  },
  iconStyle: {
    width: verticalScale(35),
    height: verticalScale(35),
    resizeMode: 'cover'
  },
  messageListItem: {
    flexDirection: 'row',
    paddingVertical: verticalScale(5)
  }
});

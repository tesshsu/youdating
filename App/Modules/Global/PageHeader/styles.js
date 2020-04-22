import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import { verticalScale, scale, moderateScale } from '../../../Helpers/ScaleHelper';

const HEADER_PADDING = Constants.platform.android
  ? Constants.statusBarHeight
  : 0;

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: verticalScale(14),
    paddingHorizontal: scale(22),
    paddingTop: verticalScale(14) + HEADER_PADDING,
    alignItems: 'center'
  },
  fill: {
    flex: 1
  },
  right: {
    flex: 1,
    alignItems: 'flex-end'
  },
  text: {
    fontSize: moderateScale(18),
    fontFamily: 'NewTaiLue-Bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});

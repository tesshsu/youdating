import { StyleSheet } from 'react-native';
import { verticalScale, moderateScale } from '../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    height: verticalScale(40),
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  floatingBar: {
    height: verticalScale(3),
    position: 'absolute',
    top: verticalScale(37)
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabLabel: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(14),
    color: '#A09D9D',
    textAlign: 'center'
  }
});

import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../Helpers/ScaleHelper';
import colors from '../../../Assets/css';

export default StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  subTitleText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(20),
    color: colors.PINK,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: verticalScale(146)
  }
});

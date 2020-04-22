import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../../Helpers/ScaleHelper';

export const MOOD_SELECTOR_HEIGHT = verticalScale(33);

export default StyleSheet.create({
  container: {
    marginTop: verticalScale(26),
    marginBottom: verticalScale(22),
    width: scale(307),
    height: MOOD_SELECTOR_HEIGHT,
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: moderateScale(16),
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'NewTaiLue-Bold',
    marginRight: scale(5)
  },
  icon: {
    transform: [
      { translateY: verticalScale(-2) }
    ]
  }
});

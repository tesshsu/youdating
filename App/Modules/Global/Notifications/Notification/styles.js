import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../../Helpers/ScaleHelper';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const HEIGHT = verticalScale(60);

export default StyleSheet.create({
  notificationContainer: {
    width: SCREEN_WIDTH,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 0,
      height: verticalScale(2)
    },
    alignItems: 'center',
    marginBottom: verticalScale(5)
  },
  notification: {
    width: SCREEN_WIDTH,
    height: HEIGHT,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingHorizontal: scale(20),
  },
  image: {
    width: scale(60),
    height: verticalScale(50),
    borderRadius: verticalScale(12),
    resizeMode: 'cover'
  },
  content: {
    flex: 1,
    height: verticalScale(50),
    marginLeft: scale(10),
    justifyContent: 'center'
  },
  titleText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(16),
    textTransform: 'uppercase',
    color: 'black',
    marginBottom: verticalScale(2)
  },
  bodyText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(14),
    color: 'black'
  }
});

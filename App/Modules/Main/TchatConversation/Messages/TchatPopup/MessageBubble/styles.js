import { StyleSheet, Dimensions } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../../../../Helpers/ScaleHelper';

const { width: WINDOW_WIDTH } = Dimensions.get('window');
const MAX_WIDTH = WINDOW_WIDTH / 6 * 4;

const IMAGE_WIDTH = MAX_WIDTH - scale(10);
const IMAGE_HEIGHT = IMAGE_WIDTH / 4 * 3;

export default StyleSheet.create({
  container: {
    maxWidth: MAX_WIDTH,
    borderRadius: verticalScale(10),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(8),
    marginBottom: verticalScale(5),
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  avatar: {
    position: 'absolute',
    bottom: 0,
    left: -scale(60),
    width: scale(50),
    height: scale(50),
    borderRadius: verticalScale(50),
    resizeMode: 'cover'
  },
  audioButtonContainer: {
    alignItems: 'center'
  },
  messageImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: verticalScale(5),
    resizeMode: 'cover'
  },
  spacer: {
    height: verticalScale(10)
  },
  bubbleText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(18),
    color: 'black'
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: scale(10)
  },
  statusText: {
    marginLeft: verticalScale(5),
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(11),
    textAlign: 'right',
    color: 'black'
  }
});

import { StyleSheet, Dimensions } from 'react-native';

import { verticalScale, scale, moderateScale } from '../../../../../Helpers/ScaleHelper';

export const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const IMAGE_WIDTH = scale(100);
export const IMAGE_HEIGHT = IMAGE_WIDTH / 4 * 3;

export default StyleSheet.create({
  composer: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(28),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputContainer: {
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: verticalScale(28) / 2,
    backgroundColor: 'white',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(8),
  },
  input: {
    flex: 1,
    maxHeight: verticalScale(80),
    color: 'black',
    fontFamily: 'Segoe-UI-Regular',
    fontSize: moderateScale(18),
    padding: 0,
    margin: 0,
    // lineHeight: 0,
    borderWidth: 0,
  },
  mediaImage: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
    borderRadius: verticalScale(7),
    alignSelf: 'flex-start'
  },
  sendButtonContainer: {
    position: 'relative',
    shadowOpacity: 0,
    alignSelf: 'flex-end'
  },
  recordingText: {
    color: 'white',
    fontFamily: 'Segoe-UI-Regular',
    fontSize: moderateScale(18),
  },
  icon: {
    marginLeft: scale(25)
  },
  leftIcon: {
    marginRight: scale(5)
  }
});

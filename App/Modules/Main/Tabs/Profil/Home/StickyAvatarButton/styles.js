import { StyleSheet } from 'react-native';
import { verticalScale } from '../../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  photoButtonUploadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: verticalScale(60),
    height: verticalScale(60),
    borderRadius: verticalScale(15),
  },
  photoButtonUploadProgressContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickerHeaderImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: verticalScale(60),
    height: verticalScale(60),
  },
  avatar: {
    width: verticalScale(60),
    height: verticalScale(60),
    borderRadius: verticalScale(15),
    borderWidth: 2,
    resizeMode: 'cover'
  }
});

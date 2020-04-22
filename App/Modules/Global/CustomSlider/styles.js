import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../Helpers/ScaleHelper';

export const SLIDER_WIDTH = scale(322);
export const THUMB_WIDTH = verticalScale(28);

export default StyleSheet.create({
  container: {
    width: SLIDER_WIDTH,
  },
  thumb: {
    ...StyleSheet.absoluteFillObject,
    width: THUMB_WIDTH,
    height: THUMB_WIDTH,
    borderRadius: THUMB_WIDTH / 2,
    backgroundColor: 'white',
    borderColor: '#F8F5F5',
    borderWidth: 2,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  bar: {
    ...StyleSheet.absoluteFillObject,
    height: verticalScale(2),
    backgroundColor: '#B4B0B0',
    transform: [
      { translateY: THUMB_WIDTH / 2 }
    ]
  },
  label: {
    position: 'absolute',
    top: 14,
    alignItems: 'center',
  },
  labelBar: {
    width: scale(2),
    height: verticalScale(8),
    backgroundColor: '#B4B0B0'
  },
  labelText: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(13),
    color: '#A4A1A1'
  }
});

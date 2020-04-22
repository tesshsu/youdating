import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '../../../Helpers/ScaleHelper';

export const MODAL_WIDTH = verticalScale(250);
export const MODAL_HEIGHT = verticalScale(250);

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999
  },
  modal: {
    width: verticalScale(250),
    height: verticalScale(250),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: verticalScale(20),
    paddingHorizontal: scale(10),
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: verticalScale(2)
    }
  },
  loadingText: {
    fontSize: moderateScale(18),
    fontFamily: 'Gadugi-Bold',
    marginTop: verticalScale(18),
    textAlign: 'center'
  }
});

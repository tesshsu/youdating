import { StyleSheet } from 'react-native';

import { verticalScale, moderateScale, scale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  scrollViewContent: {
    paddingBottom: verticalScale(60),
  },
  headerTextContainer: {
    position: 'relative'
  },
  headerText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowRadius: 3,
    textShadowOffset: { width: 0, height: 0 },
    elevation: 2
  },
  headerOnline: {
    width: scale(6),
    height: verticalScale(6),
    borderRadius: scale(3),
    position: 'absolute',
    right: scale(-10),
    top: verticalScale(2),
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: { y: 0, x: 0 },
    elevation: 2
  },
  avatar: {
    width: verticalScale(60),
    height: verticalScale(60),
    borderRadius: verticalScale(15),
    borderWidth: 2,
    resizeMode: 'cover'
  },
  topHeaderProfile: {
    height: '100%',
    position: 'relative',
    marginTop: verticalScale(23),
  },
  backButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});

import { StyleSheet } from 'react-native';

import { moderateScale, verticalScale } from '../../../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  title: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(16),
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: verticalScale(20)
  },
  paragraph: {
    fontFamily: 'NewTaiLue-Regular',
    lineHeight: verticalScale(17),
    color: '#707070',
    marginBottom: verticalScale(20)
  },
  section: {
    marginTop: verticalScale(45),
  },
  sliderContainer: {
    marginTop: verticalScale(18),
    marginBottom: verticalScale(15)
  },
  slider: {
    alignSelf: 'center',
  },
  line: {
	  borderTopColor: '#eee',
    borderTopWidth: 2,
	  paddingTop: verticalScale(25)
  },
  blackText: {
	  fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(25),
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  shortDescription: {
	  fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(16),
    textAlign: 'center',
	  color: '#707070',
  },
  imageCenter: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  starsImage: {
    width: 117,
    height: 24,
    textAlign: 'center',
    resizeMode: 'cover'
  }
});

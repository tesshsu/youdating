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
  sectionTitle: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(16),
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  sliderContainer: {
    marginTop: verticalScale(18),
    marginBottom: verticalScale(15)
  },
  slider: {
    alignSelf: 'center',
  }
});

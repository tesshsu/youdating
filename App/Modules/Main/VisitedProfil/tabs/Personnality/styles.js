import { StyleSheet } from 'react-native';

import { moderateScale, verticalScale } from '../../../../../Helpers/ScaleHelper';

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
});

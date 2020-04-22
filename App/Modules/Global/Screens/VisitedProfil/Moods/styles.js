import { StyleSheet } from 'react-native';

import { moderateScale, verticalScale, scale } from '../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  description: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(14),
    color: '#8F8C8C',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: verticalScale(19)
  },
  tag: {
    color: '#000000',
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(14),
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: verticalScale(17)
  },
  text: {
    fontFamily: 'NewTaiLue-Regular',
    fontSize: moderateScale(14),
    textAlign: 'center',
    color: '#8F8C8C',
  },
  imagesContainer: {
    width: scale(324),
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: verticalScale(10)
  },
  imageHolderContainer: {
    marginVertical: verticalScale(4),
    marginHorizontal: verticalScale(2)
  }
});

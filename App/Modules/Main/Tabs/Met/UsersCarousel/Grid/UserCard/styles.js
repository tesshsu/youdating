import { StyleSheet } from 'react-native';

import { verticalScale, moderateScale, scale } from '../../../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto'
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    marginBottom: verticalScale(2),
    borderRadius: verticalScale(15),
  },
  nameText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(14),
    textTransform: 'uppercase'
  },
  infosText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(10),
    color: '#848484',
    textTransform: 'uppercase'
  }
});

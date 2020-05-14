import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  labelText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(14),
    textTransform: 'uppercase',
    color: '#fff',
    marginBottom: verticalScale(7)
  },
  switch: {
    height: verticalScale(33),
    borderRadius: verticalScale(13),
    color: 'black'
  },
  errorText: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: moderateScale(12),
    marginTop: verticalScale(5),
    color: '#f75a5a',
    paddingLeft: scale(10),
  }
});

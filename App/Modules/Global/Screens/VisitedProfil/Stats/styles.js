import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  title: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(18),
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: verticalScale(21),
    marginTop: verticalScale(33)
  },
  graphImage: {
    width: 340,
    height: 200,
    resizeMode: 'cover'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    flex: 1
  },
  labelText: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: verticalScale(14),
    color: '#717171',
  },
  valueText: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: verticalScale(14),
    color: '#717171',
  },
  letter: {
    paddingRight: scale(5)
  },
  letterText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(16),
  },
  line: {
    height: 1,
    backgroundColor: '#BEBEBE',
    marginTop: verticalScale(33)
  },
  text: {
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  starsImage: {
    width: 117,
    height: 24,
    resizeMode: 'cover'
  }
});

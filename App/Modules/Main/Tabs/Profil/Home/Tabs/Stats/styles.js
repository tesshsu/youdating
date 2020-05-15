import { StyleSheet } from 'react-native';
import { moderateScale, verticalScale, scale } from '../../../../../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  statsTitle: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(18),
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: verticalScale(21),
    marginTop: verticalScale(33)
  },
  graphImage: {
    width: scale(340.5),
    height: verticalScale(214),
    resizeMode: 'contain'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'Segoe-UI-Bold',
    fontSize: moderateScale(18),
    textAlign: 'center',
    marginVertical: verticalScale(20)
  },
  label: {
    flex: 1,
    marginRight: 5
  },
  labelText: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: verticalScale(14),
    color: '#717171',
    textTransform: 'uppercase'
  },
  valueText: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: verticalScale(14),
    color: '#717171',
  },
  letter: {
    marginLeft: scale(5),
    paddingRight: scale(5)
  },
  letterText: {
    fontFamily: 'Gadugi-Bold',
    fontSize: moderateScale(16),
    textTransform: 'uppercase'
  },
  line: {
    height: 1,
    backgroundColor: '#BEBEBE',
    marginTop: verticalScale(33)
  },
  statsText: {
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  starsImage: {
    width: 117,
    height: 24,
    resizeMode: 'cover',
    marginBottom: verticalScale(10)
  },
  addNoteDescription: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: verticalScale(14),
    color: '#717171',
    marginBottom: verticalScale(24),
  },
});

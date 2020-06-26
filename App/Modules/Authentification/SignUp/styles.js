import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../Helpers/ScaleHelper';
import colors from '../../../Assets/css';
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  fill: {
    flex: 1,
  },
  yousTitleText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(26),
    color: colors.PINK,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: verticalScale(53)
  },
  subTitleText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(20),
    color: colors.PINK,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  subSubTitleText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(10),
    color: colors.PINK,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  createAccountText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(18),
    textAlign: 'center',
    color: colors.WHITE
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  birthdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1
  },
  birthdayTextField: {
    flex: 1,
    marginRight: scale(10)
  },
  birthdaylabelText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(14),
    color: colors.WHITE,
    marginBottom: verticalScale(7),
    marginTop: verticalScale(23),
    textTransform: 'uppercase'
  },
  errorText: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: moderateScale(12),
    marginTop: verticalScale(5),
    color: '#f75a5a',
    paddingLeft: scale(10),
  },
  loader: {
    marginTop: verticalScale(10)
  },
  predictionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(15),
  },
  predictionMarker: {
    marginRight: scale(10)
  },
  predictionText: {
    fontFamily: 'Segoe-UI-Regular',
    fontSize: moderateScale(16),
    color: 'black'
  },
  sexeButton: {
	color: colors.PINK,
  }
});

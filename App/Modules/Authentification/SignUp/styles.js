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
  scrollViewContent: {
    paddingHorizontal: scale(63),
    paddingVertical: verticalScale(20),
    alignItems: 'stretch'
  },
  backgroundContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  bakcgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  yousTitleText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(26),
    color: colors.PINK,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginTop: verticalScale(43)
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
    textTransform: 'uppercase',
    marginBottom: verticalScale(42)
  },
  or: {
    marginVertical: verticalScale(23),
    flexDirection: 'row',
    alignItems: 'center'
  },
  bar: {
    flex: 1,
    height: 1,
    backgroundColor: colors.WHITE
  },
  orText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(14),
    textTransform: 'uppercase',
    color: colors.WHITE,
    paddingHorizontal: scale(22)
  },
  createAccountText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(18),
    textAlign: 'center',
    color: colors.WHITE
  },
  textField: {
    marginTop: verticalScale(23)
  },
  nextButton: {
    marginTop: verticalScale(30)
  },
  link: {
    marginTop: verticalScale(30)
  },
  linkText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(13),
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'black'
  },
  linearGradient: {
    marginTop: moderateScale(43),
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 20
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  scrollViewContainer: {
    flex: 1,
    position: 'relative',
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
    color: '#837777',
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
  }
});

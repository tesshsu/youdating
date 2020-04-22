import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../Helpers/ScaleHelper';

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
  yousTitleText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(26),
    color: 'black',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: verticalScale(13)
  },
  subTitleText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(20),
    color: '#84B5E4',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: verticalScale(16)
  },
  subSubTitleText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(10),
    color: 'black',
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
    backgroundColor: '#BFB9B9'
  },
  orText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(14),
    textTransform: 'uppercase',
    paddingHorizontal: scale(22)
  },
  createAccountText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(18),
    color: 'black',
    alignSelf: 'flex-start'
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

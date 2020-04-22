import { StyleSheet } from 'react-native';
import { verticalScale, scale, moderateScale } from '../../../Helpers/ScaleHelper';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  fill: {
    flex: 1,
  },
  keyboardAvoidingViewContent: {
    position: 'relative',
    backgroundColor: 'white'
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    position: 'relative',
  },
  content: {
    paddingHorizontal: scale(63),
    paddingTop: verticalScale(67),
    paddingBottom: verticalScale(140),
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  subTitleText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(20),
    color: '#84B5E4',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: verticalScale(56)
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
    width: '100%',
    marginTop: verticalScale(23)
  },
  submitButton: {
    alignSelf: 'center',
    marginTop: verticalScale(30)
  },
  link: {
    marginVertical: verticalScale(30)
  },
  linkText: {
    fontFamily: 'NewTaiLue-Bold',
    fontSize: moderateScale(13),
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'black'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
});
